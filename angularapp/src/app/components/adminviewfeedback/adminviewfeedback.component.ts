// import { Component, OnInit } from '@angular/core';
// import { Feedback } from 'src/app/models/feedback.model';
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
//   feedbacks: Feedback[] = [
//     // {
//     //   FeedbackId: 1,
//     //   UserId: 1,
//     //   FeedbackText: 'good',
//     //   Date: new Date('2003-01-30')
//     // }
//   ];
  
//   selectedUser: Feedback | null = null;

//   constructor(private feedbackService: FeedbackService) { }

//   ngOnInit(): void {
//     this.loadFeedback();
//   }

//   loadFeedback(): void {
//     this.feedbackService.getFeedbacks().subscribe(data => {
//       this.feedbacks = data;
//     });
//   }

//   submitFeedback(): void {
//     if (!this.feedbackText.trim()) {
//       this.showValidation = true;
//       return;
//     }
//     const userId = Number(localStorage.getItem('userId'));
//     const feedback: Feedback = {
//       UserId: userId,
//       FeedbackText: this.feedbackText,
//       Date: new Date()
//     };

//     // this.feedbackService.sendFeedback(feedback).subscribe({
//       this.feedbackService.sendFeedback(feedback,{}).subscribe({

//       next: () => {
//         this.showPopup = true;
//         this.feedbackText = '';
//         this.showValidation = false;
//         this.loadFeedback(); // Refresh the feedback list
//       },
//       error: (err) => {
//         console.error('Error submitting feedback:', err);
//       }
//     });
//   }

//   showProfile(feedback: Feedback): void {
//     this.selectedUser = feedback;
//   }

//   closePopup(): void {
//     this.showPopup = false;
//   }

//   closeProfile(): void {
//     this.selectedUser = null;
//   }
// }

import { Component, OnInit } from '@angular/core';

import { Feedback } from 'src/app/models/feedback.model';

import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';



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
  selectedUser: Feedback | null = null;
  users: User[] = [];
  userName: string = "";
  
  constructor(private feedbackService: FeedbackService ) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.loadFeedbacks();

  }

  loadFeedbacks(): void 
  {
    this.feedbackService.getFeedbacks().subscribe(data => {
            this.feedbacks = data;
        });
  }


  submitFeedback(): void {
    if (!this.feedbackText.trim()) {
      this.showValidation = true;
      return;
    }
    const userId = Number(localStorage.getItem('userId'));
    const feedback: Feedback = {
      UserId: userId,
      FeedbackText: this.feedbackText,
      Date: new Date()
    };

      this.feedbackService.sendFeedback(feedback,{}).subscribe({

      next: () => {
        this.showPopup = true;
        this.feedbackText = '';
        this.showValidation = false;
        this.loadFeedback(); // Refresh the feedback list
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
      }
    });

//   getUsername(userId: number): string 
//   {
 
//     const user = this.users.find(u => u.UserId === userId);
//     console.log("gagan = "+this.users)
//     return user ? user.Username : '';

//   }
  getUserDetails(userId: number): User | undefined 
  {
    return this.users.find(u => u.UserId === userId);
  }
  
  showProfile(feedback: Feedback): void 
  {
    this.selectedUser = feedback;
  }
  closePopup(): void 
  {
    this.showPopup = false;
  }
  closeProfile(): void 
  {
    this.selectedUser = null;

}

}







