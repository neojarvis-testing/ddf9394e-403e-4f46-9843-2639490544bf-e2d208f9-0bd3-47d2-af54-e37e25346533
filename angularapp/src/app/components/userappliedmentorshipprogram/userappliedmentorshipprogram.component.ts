import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
 
@Component({
  selector: 'app-userappliedmentorshipprogram',
  templateUrl: './userappliedmentorshipprogram.component.html',
  styleUrls: ['./userappliedmentorshipprogram.component.css']
})
export class UserappliedmentorshipprogramComponent implements OnInit {
 
  mentorships: any[] = [];
  searchTerm: string = '';
  imageToShow: string | null = null;
  userId: any;
  showModal: boolean = false;
  applicationToDelete: number | null = null;
 
  constructor(private mentorshipService: MentorshipService) {
    this.userId = localStorage.getItem('userId'); // Retrieve user ID directly from local storage
  }
 
  ngOnInit(): void {
    if (this.userId) {
      this.mentorshipService.getAppliedMentorshipPrograms(this.userId).subscribe((data: any[]) => {
        console.log('Backend response:', data); // Log the backend response
        this.mentorships = data.map((item, index) => ({
          serialNo: index + 1,
          applicationId: item.MentorshipApplicationId,
          programId: item.MentorshipProgramId,
          profileImage: item.ProfileImage,
          applicationDate: new Date(item.ApplicationDate).toLocaleDateString(),
          status: item.ApplicationStatus,
          programName: '' // Initialize with an empty string
        }));
 
        // Fetch program names based on program IDs
        this.mentorships.forEach(mentorship => {
          this.mentorshipService.getMentorshipProgramById(mentorship.programId).subscribe(program => {
            mentorship.programName = program.ProgramName;
          });
        });
 
        console.log('Mapped mentorships:', this.mentorships); // Log the mapped data
      }, error => {
        console.error('Error fetching applied mentorship programs:', error);
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }
 
  get filteredMentorships(): any[] {
    return this.mentorships.filter(m =>
      m.programName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
 
  viewImage(imageUrl: string): void {
    this.imageToShow = imageUrl;
  }
 
  closeImage(): void {
    this.imageToShow = null;
  }
 
  confirmDelete(applicationId: number): void {
    this.applicationToDelete = applicationId;
    this.showModal = true;
  }
 
  cancelDelete(): void {
    this.showModal = false;
    this.applicationToDelete = null;
  }
 
  deleteApplication(): void {
    if (this.applicationToDelete !== null) {
      this.mentorshipService.deleteMentorshipApplication(this.applicationToDelete).subscribe(() => {
        this.mentorships = this.mentorships.filter(m => m.applicationId !== this.applicationToDelete);
        console.log('Application deleted successfully');
        this.showModal = false;
        this.applicationToDelete = null;
      }, error => {
        console.error('Error deleting application:', error);
      });
    }
  }
}
 