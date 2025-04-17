
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { MentorshipService } from 'src/app/services/mentorship.service';

@Component({
  selector: 'app-requestedmentorshipapplication',
  templateUrl: './requestedmentorshipapplication.component.html',
  styleUrls: ['./requestedmentorshipapplication.component.css']
})
export class RequestedmentorshipapplicationComponent implements OnInit {
  applications: MentorshipApplication[] = [];
  users:User[]=[];
  combinedApplications:any[]=[];
  filteredApplications: MentorshipApplication[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  showProfileImagePopup: boolean = false;
  selectedProfileImage: string | null = null;
  selectedApplication: MentorshipApplication | null = null;
 
  constructor(private mentorshipService: MentorshipService,private router:Router,private userService:AuthService) {}
 
  ngOnInit(): void {
   
    this.loadUsersAndApplications();
  }
 
  
  loadUsersAndApplications(): void {

    this.userService.getAllUsers().subscribe(
   
     (usersData: User[]) => {
   
      this.users = usersData;
   
   
   
      this.mentorshipService.getAllMentorshipApplications().subscribe(
   
       (applicationData: MentorshipApplication[]) => {
   
        this.applications = applicationData;
   
   
   
        // Combine username with application for display
   
        this.combinedApplications = this.applications.map(app => {
   
         const matchedUser = this.users.find(user => user.UserId === app.UserId);
   
         return {
   
          ...app,
   
          Username: matchedUser ? matchedUser.Username : 'Unknown User'
   
         };
   
        });
   
       },
   
       (error) => console.error('Error fetching applications:', error)
   
      );
   
     },
   
     (error) => console.error('Error fetching users:', error)
   
    );
   
   }
 
  /** Toggle application status between Approved and Rejected **/
  toggleApplicationStatus(application: MentorshipApplication): void {
    application.ApplicationStatus =
      application.ApplicationStatus === 'Approved' ? 'Rejected' :
      application.ApplicationStatus === 'Rejected' ? 'Approved' :
      'Approved'; // Default case (Pending → Approved)
 
    this.mentorshipService.updateApplicationStatus(application.MentorshipApplicationId, application).subscribe(
      () => {
        localStorage.setItem(`status_${application.MentorshipApplicationId}`, application.ApplicationStatus);
        alert(`Application status changed to: ${application.ApplicationStatus}`);
      },
      (error) => console.error('Error updating status:', error)
    );
  }
 
 
  searchApplications(): void {
    this.combinedApplications = this.applications
      .filter(application => application.CareerGoals.toLowerCase().includes(this.searchTerm.toLowerCase()))
      .map(app => {
        const matchedUser = this.users.find(user => user.UserId === app.UserId);
        return {
          ...app,
          Username: matchedUser ? matchedUser.Username : 'Unknown User'
        };
      });
  }
  
 
  onStatusChange(status: string): void {
    this.statusFilter = status;
    if (status === 'all') {
      this.combinedApplications = this.applications.map(app => {
        const matchedUser = this.users.find(user => user.UserId === app.UserId);
        return {
          ...app,
          Username: matchedUser ? matchedUser.Username : 'Unknown User'
        };
      });
    } else {
      this.combinedApplications = this.applications
        .filter(application => application.ApplicationStatus === status)
        .map(app => {
          const matchedUser = this.users.find(user => user.UserId === app.UserId);
          return {
            ...app,
            Username: matchedUser ? matchedUser.Username : 'Unknown User'
          };
        });
    }
  }
  
 
  /** View profile image **/
  viewProfileImage(application: MentorshipApplication): void {
    this.selectedProfileImage = application.ProfileImage;
    this.showProfileImagePopup = true;
  }
 
  closeProfileImagePopup(): void {
    this.showProfileImagePopup = false;
    this.selectedProfileImage = null;
  }

  viewAllDetails() {
    // Implement navigation to detailed view if needed
    this.router.navigate([`/admin/mentorshipapplicationlist`])

  }
 
  closeModal(): void {
    this.selectedApplication = null;
  }
}