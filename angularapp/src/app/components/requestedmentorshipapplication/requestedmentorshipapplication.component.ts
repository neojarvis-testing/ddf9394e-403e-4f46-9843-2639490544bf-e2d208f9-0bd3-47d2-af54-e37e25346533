import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipService } from 'src/app/services/mentorship.service';

@Component({
  selector: 'app-requestedmentorshipapplication',
  templateUrl: './requestedmentorshipapplication.component.html',
  styleUrls: ['./requestedmentorshipapplication.component.css']
})
export class RequestedmentorshipapplicationComponent implements OnInit {
  applications: MentorshipApplication[] = [];
  filteredApplications: MentorshipApplication[] = [];
  paginatedApplications: MentorshipApplication[] = [];
  selectedApplication: MentorshipApplication | null = null;
  statusFilter: string | 'all' = 'all';
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  showProfileImagePopup = false;
  selectedProfileImage = '';

  constructor(private service: MentorshipService,private router:Router) {}

  ngOnInit(): void {
    this.fetchApplications();
  }

  fetchApplications(): void {
    this.service.getAllMentorshipApplications().subscribe({
      next: (data: MentorshipApplication[]) => {
        this.applications = data.map(app => {
          if (!app.MentorshipApplicationId) {
            console.error("Missing application ID for:", app);
          }
          if (app.ApplicationStatus === undefined || app.ApplicationStatus === null) {
            app.ApplicationStatus = 'Pending'; // Default to Pending
          }
          return app;
        });
        this.filteredApplications = this.applications;
        this.filterData(); // Apply filters after fetching data
        this.updatePagination();
        console.log(this.filteredApplications)
      },
      error: (error) => {
        console.error('Error fetching applications:', error);
      }
    });
  }

  searchApplications(): void {
    if (this.searchTerm) {
      this.filteredApplications = this.applications.filter(app =>
        app.CareerGoals.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredApplications = this.applications;
    }
    this.updatePagination();
  }

  filterData(): void {
    this.filteredApplications = this.applications.filter(app => {
      const status = app.ApplicationStatus ? app.ApplicationStatus.toLowerCase() : '';
      const matchesStatus = this.statusFilter === 'all' || status === this.statusFilter.toLowerCase();
      const matchesSearch = app.CareerGoals.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    this.updatePagination();
  }

  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedApplications = this.filteredApplications.slice(startIndex, endIndex);
  }

 

 

  approveApplication(application: MentorshipApplication): void {
    if (application.ApplicationStatus === 'Rejected') {
      console.error("Cannot approve a rejected application.");
      return;
    }
    if (!application.MentorshipApplicationId) {
      console.error("Invalid application ID. Application:", application);
      return;
    }
    const updatedApplication = { ...application, ApplicationStatus: 'Approved' };
    this.service.updateApplicationStatus(application.MentorshipApplicationId, updatedApplication).subscribe({
      next: () => {
        const index = this.applications.findIndex(app => app.MentorshipApplicationId === application.MentorshipApplicationId);
        if (index !== -1) {
          this.applications[index] = updatedApplication;
        }
        const filteredIndex = this.filteredApplications.findIndex(app => app.MentorshipApplicationId === application.MentorshipApplicationId);
        if (filteredIndex !== -1) {
          this.filteredApplications[filteredIndex] = updatedApplication;
        }
        this.filterData();
      },
      error: (error) => {
        console.error("Error approving application:", error);
      }
    });
  }

  rejectApplication(application: MentorshipApplication): void {
    if (application.ApplicationStatus === 'Approved') {
      console.error("Cannot reject an approved application.");
      return;
    }
    if (!application.MentorshipApplicationId) {
      console.error("Invalid application ID.");
      return;
    }
    const updatedApplication = { ...application, ApplicationStatus: 'Rejected' };
    this.service.updateApplicationStatus(application.MentorshipApplicationId, updatedApplication).subscribe({
      next: () => {
        const index = this.applications.findIndex(app => app.MentorshipApplicationId === application.MentorshipApplicationId);
        if (index !== -1) {
          this.applications[index] = updatedApplication;
        }
        const filteredIndex = this.filteredApplications.findIndex(app => app.MentorshipApplicationId === application.MentorshipApplicationId);
        if (filteredIndex !== -1) {
          this.filteredApplications[filteredIndex] = updatedApplication;
        }
        this.filterData();
      },
      error: (error) => {
        console.error("Error rejecting application:", error);
      }
    });
  }

  viewProfileImage(application: MentorshipApplication): void {
    this.selectedProfileImage = application.ProfileImage 
      ? application.ProfileImage 
      : 'assets/images/download.png';
    this.showProfileImagePopup = true;
  }

  closeProfileImagePopup(): void {
    this.showProfileImagePopup = false;
  }

  onStatusChange(newStatus: string): void {
    this.statusFilter = newStatus;
    this.filterData();
  }

  onSearchChange(searchText: string): void {
    this.searchTerm = searchText;
    this.filterData();
  }
  viewAllDetails() {
    // Implement navigation to detailed view if needed
    this.router.navigate([`admin/mentorshipapplicationlist`])
  }
}
