// import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';
// import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MentorshipService } from 'src/app/services/mentorship.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';
// import { User } from 'src/app/models/user.model';

// @Component({
//   selector: 'app-requestedmentorshipapplication',
//   templateUrl: './requestedmentorshipapplication.component.html',
//   styleUrls: ['./requestedmentorshipapplication.component.css']
// })
// export class RequestedmentorshipapplicationComponent implements OnInit {
//   applications: MentorshipApplication[] = [];
//   users: User[] = [];
//   combinedApplications: any[] = [];
//   filteredApplications: MentorshipApplication[] = [];
//   searchTerm: string = '';
//   statusFilter: string = 'all';
//   showProfileImagePopup: boolean = false;
//   selectedProfileImage: string | null = null;
//   selectedApplication: MentorshipApplication | null = null;
//   currentPage: number = 1;
//   itemsPerPage: number = 15;

//   constructor(
//     private mentorshipService: MentorshipService,
//     private router: Router,
//     private userService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadUsersAndApplications();
//   }

//   loadUsersAndApplications(): void {
//     this.userService.getAllUsers().subscribe(
//       (usersData: User[]) => {
//         this.users = usersData;

//         this.mentorshipService.getAllMentorshipApplications().subscribe(
//           (applicationData: MentorshipApplication[]) => {
//             this.applications = applicationData;

//             // Combine username with application for display
//             this.combinedApplications = this.applications.map(app => {
//               const matchedUser = this.users.find(user => user.UserId === app.UserId);
//               return {
//                 ...app,
//                 Username: matchedUser ? matchedUser.Username : 'Unknown User'
//               };
//             });
//           },
//           (error) => console.error('Error fetching applications:', error)
//         );
//       },
//       (error) => console.error('Error fetching users:', error)
//     );
//   }

//   toggleApplicationStatus(application: MentorshipApplication, status: string): void {
//     application.ApplicationStatus = status;

//     this.mentorshipService.updateApplicationStatus(application.MentorshipApplicationId, application).subscribe(
//       () => {
//         localStorage.setItem(`status_${application.MentorshipApplicationId}`, application.ApplicationStatus);
//         alert(`Application status changed to: ${application.ApplicationStatus}`);
//       },
//       (error) => console.error('Error updating status:', error)
//     );
//   }

//   searchApplications(): void {
//     this.combinedApplications = this.applications
//       .filter(application => application.CareerGoals.toLowerCase().includes(this.searchTerm.toLowerCase()))
//       .map(app => {
//         const matchedUser = this.users.find(user => user.UserId === app.UserId);
//         return {
//           ...app,
//           Username: matchedUser ? matchedUser.Username : 'Unknown User'
//         };
//       });
//   }

//   onStatusChange(status: string): void {
//     this.statusFilter = status;
//     if (status === 'all') {
//       this.combinedApplications = this.applications.map(app => {
//         const matchedUser = this.users.find(user => user.UserId === app.UserId);
//         return {
//           ...app,
//           Username: matchedUser ? matchedUser.Username : 'Unknown User'
//         };
//       });
//     } else {
//       this.combinedApplications = this.applications
//         .filter(application => application.ApplicationStatus === status)
//         .map(app => {
//           const matchedUser = this.users.find(user => user.UserId === app.UserId);
//           return {
//             ...app,
//             Username: matchedUser ? matchedUser.Username : 'Unknown User'
//           };
//         });
//     }
//   }

//   viewProfileImage(application: MentorshipApplication): void {
//     this.selectedProfileImage = application.ProfileImage;
//     this.showProfileImagePopup = true;
//   }

//   closeProfileImagePopup(): void {
//     this.showProfileImagePopup = false;
//     this.selectedProfileImage = null;
//   }

//   viewAllDetails() {
//     this.router.navigate([`/admin/mentorshipapplicationlist`]);
//   }

//   closeModal(): void {
//     this.selectedApplication = null;
//   }

//   get paginatedApplications(): any[] {
//     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     return this.combinedApplications.slice(startIndex, endIndex);
//   }

//   changePage(page: number): void {
//     if (page > 0 && page <= Math.ceil(this.combinedApplications.length / this.itemsPerPage)) {
//       this.currentPage = page;
//     }
//   }
// }
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-requestedmentorshipapplication',
  templateUrl: './requestedmentorshipapplication.component.html',
  styleUrls: ['./requestedmentorshipapplication.component.css']
})
export class RequestedmentorshipapplicationComponent implements OnInit {
  applications: MentorshipApplication[] = [];
  users: User[] = [];
  combinedApplications: any[] = [];
  filteredApplications: MentorshipApplication[] = [];
  searchTerm: string = '';
  statusFilter: string = 'all';
  showProfileImagePopup: boolean = false;
  selectedProfileImage: string | null = null;
  selectedApplication: MentorshipApplication | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 15;

  constructor(
    private mentorshipService: MentorshipService,
    private router: Router,
    private userService: AuthService
  ) {}

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

  toggleApplicationStatus(application: MentorshipApplication, status: string): void {
    application.ApplicationStatus = status;

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

  viewProfileImage(application: MentorshipApplication): void {
    this.selectedProfileImage = application.ProfileImage;
    this.showProfileImagePopup = true;
  }

  closeProfileImagePopup(): void {
    this.showProfileImagePopup = false;
    this.selectedProfileImage = null;
  }

  viewAllDetails() {
    this.router.navigate([`/admin/mentorshipapplicationlist`]);
  }

  closeModal(): void {
    this.selectedApplication = null;
  }

  get paginatedApplications(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.combinedApplications.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.combinedApplications.length / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
