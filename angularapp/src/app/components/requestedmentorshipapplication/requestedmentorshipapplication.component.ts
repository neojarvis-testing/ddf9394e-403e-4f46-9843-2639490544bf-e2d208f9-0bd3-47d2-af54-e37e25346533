import { Component, OnInit } from '@angular/core';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipService } from 'src/app/services/mentorship.service';

@Component({
  selector: 'app-requestedmentorshipapplication',
  templateUrl: './requestedmentorshipapplication.component.html',
  styleUrls: ['./requestedmentorshipapplication.component.css']
})
export class RequestedmentorshipapplicationComponent implements OnInit {
  applications = [];
  filteredApplications = [];
  searchTerm = '';
  filterStatus = '';
  showProfileImagePopup = false;
  selectedProfileImage = '';

  constructor(private service: MentorshipService) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications() {
    this.service.getAllMentorshipApplications().subscribe(a => {
      this.applications = a;
      this.filteredApplications = this.applications;
    });
  }

  searchApplications() {
    this.filteredApplications = this.applications.filter(application =>
      application.careerGoals.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  filterApplications() {
    this.filteredApplications = this.applications.filter(application =>
      application.status.includes(this.filterStatus)
    );
  }

  approveApplication(application:MentorshipApplication) {
    application.ApplicationStatus = 'Approved';
    this.service.updateApplicationStatus(application.MentorshipApplicationId, application).subscribe();
  }

  rejectApplication(application:MentorshipApplication) {
    application.ApplicationStatus = 'Rejected';
    this.service.updateApplicationStatus(application.MentorshipApplicationId, application).subscribe();
  }

  viewProfileImage(application:MentorshipApplication) {
    this.selectedProfileImage = application.ProfileImage 
      ? application.ProfileImage 
      : 'assets/images/download.png';
    this.showProfileImagePopup = true;
  }

  closeProfileImagePopup() {
    this.showProfileImagePopup = false;
  }

  viewAllDetails(application:MentorshipApplication) {
    // Implement navigation to detailed view if needed
  }
}
