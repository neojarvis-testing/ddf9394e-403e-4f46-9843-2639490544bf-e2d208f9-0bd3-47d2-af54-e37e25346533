import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';

@Component({
  selector: 'app-userappliedmentorshipprogram',
  //templateUrl: './userappliedmentorshipprogram.component.html',
  styleUrls: ['./userappliedmentorshipprogram.component.css']
})
export class UserappliedmentorshipprogramComponent implements OnInit {

  mentorships: any[] = [];
  searchTerm: string = '';
  imageToShow: string | null = null;
  userId: any;

  constructor(private mentorshipService: MentorshipService) {
    this.userId = localStorage.getItem('userId'); // Retrieve user ID directly from local storage
  }

  ngOnInit(): void {
    this.mentorshipService.getAppliedMentorshipPrograms(this.userId).subscribe((data: any[]) => {
      this.mentorships = data;
    });
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
}
