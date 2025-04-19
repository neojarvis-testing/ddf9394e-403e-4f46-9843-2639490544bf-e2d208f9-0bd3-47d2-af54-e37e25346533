

// import { Component, OnInit } from '@angular/core';
 
// import { Feedback } from 'src/app/models/feedback.model';
 
// import { User } from 'src/app/models/user.model';
// import { FeedbackService } from 'src/app/services/feedback.service';
 
 
 
// @Component({
 
//   selector: 'app-adminviewfeedback',
 
//   templateUrl: './adminviewfeedback.component.html',
 
//   styleUrls: ['./adminviewfeedback.component.css']
 
// })
 
// export class AdminviewfeedbackComponent implements OnInit {
 
//   feedbackText: string = '';
//   showValidation: boolean = false;
//   showPopup: boolean = false;
//   feedbacks: Feedback[] = [];
//   selectedUser: Feedback | null = null;
//   users: User[] = [];
//   userName: string = "";
 
//   constructor(private feedbackService: FeedbackService ) {}
 
//   ngOnInit(): void {
//     this.userName = localStorage.getItem('userName');
//     this.loadFeedbacks();
 
//   }
 
//   loadFeedbacks(): void
//   {
//     this.feedbackService.getFeedbacks().subscribe(data => {
//             this.feedbacks = data;
//         });
//   }
//   getUsername(userId: number): string
//   {
 
//     const user = this.users.find(u => u.UserId === userId);
//     return user ? user.Username : '';
//   }
//   getUserDetails(userId: number): User | undefined
//   {
//     return this.users.find(u => u.UserId === userId);
//   }
 
//   showProfile(feedback: Feedback): void
//   {
//     this.selectedUser = feedback;
//   }
//   closePopup(): void
//   {
//     this.showPopup = false;
//   }
//   closeProfile(): void
//   {
//     this.selectedUser = null;
 
// }
 
// }
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
 selector: 'app-adminviewfeedback',
 templateUrl: './adminviewfeedback.component.html',
 styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {
 feedbackText: string = '';
 showValidation: boolean = false;
 showPopup: boolean = false;
 feedbacks: Feedback[] = [];
 selectedUser: User | null = null;
 users: User[] = [];
 userName: string = "";
 constructor(
  private feedbackService: FeedbackService,
  private authService: AuthService
 ) {}

 ngOnInit(): void {
  this.userName = localStorage.getItem('userName') || '';
  this.loadFeedbacks();
 }

 loadFeedbacks(): void {
    // Show loading alert before fetching data
    Swal.fire({
      title: 'Loading Feedbacks...',
      html: '<i class="fas fa-sync fa-hourglass-half fa-3x"></i>',
      text: 'Please wait while we fetch data.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading(); // Activate loading spinner
      }
    });
  
    this.authService.getAllUsers().subscribe(users => {
      this.users = users;
  
      this.feedbackService.getFeedbacks().subscribe(data => {
        this.feedbacks = data;
        
        // Close the loading alert after data is loaded
        Swal.close();
      }, error => {
        Swal.fire('Error', 'Failed to load feedbacks', 'error');
      });
  
    }, error => {
      Swal.fire('Error', 'Failed to load users', 'error');
    });
  }
  

 getUsername(userId: number): string {
  const user = this.users.find(u => u.UserId === userId);
  return user ? user.Username : '';
 }

 getUserDetails(userId: number): User | undefined {
  return this.users.find(u => u.UserId === userId);
 }
 showProfile(feedback: Feedback): void {
  const userDetails = this.getUserDetails(feedback.UserId);
  if (userDetails) {
   this.selectedUser = userDetails;
  } else {
   this.selectedUser = null;
  }
 }
 closeProfile(): void {
  this.selectedUser = null;
 }
}