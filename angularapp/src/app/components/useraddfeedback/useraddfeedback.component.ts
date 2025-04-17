// // import { HttpErrorResponse } from '@angular/common/http';
// // import { Component, OnInit } from '@angular/core';

// // import { ActivatedRoute, Router } from '@angular/router';

// // import { Feedback } from 'src/app/models/feedback.model';
// // import { FeedbackService } from 'src/app/services/feedback.service';

// // @Component({
// //   selector: 'app-useraddfeedback',
// //   templateUrl: './useraddfeedback.component.html',
// //   styleUrls: ['./useraddfeedback.component.css']
// // })
// // export class UseraddfeedbackComponent implements OnInit {


// //   feedback:Feedback={
// //     UserId: 0,
// //     FeedbackText: '',
// //     Date: undefined,
  
// //   };
// //   constructor(private feedbackService:FeedbackService,private router:Router,private route:ActivatedRoute) { }


// //   ngOnInit(): void {
// //     this.feedback.UserId = +localStorage.getItem('userId');
// //     this.feedback.Date = new Date();

// //   }


// //   addFeedback()

// //   {
// //     this.feedbackService.sendFeedback(this.feedback).subscribe(()=>
// //     {
// //       this.router.navigate(['customer/viewFeedback']);
// //     });
// //   }
// // }

// import { HttpErrorResponse } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { Feedback } from 'src/app/models/feedback.model';
// import { FeedbackService } from 'src/app/services/feedback.service';

// @Component({
//   selector: 'app-useraddfeedback',
//   templateUrl: './useraddfeedback.component.html',
//   styleUrls: ['./useraddfeedback.component.css']
// })
// export class UseraddfeedbackComponent implements OnInit {

//   feedback: Feedback = {
//     UserId: 0,
//     FeedbackText: '',
//     Date: undefined,
//   };
//   errorMessage: string = '';

//   constructor(private feedbackService: FeedbackService, private router: Router, private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     this.feedback.UserId = +localStorage.getItem('userId');
//     this.feedback.Date = new Date();
//   }

//   addFeedback() {
//     if (!this.feedback.FeedbackText.trim()) {
//       this.errorMessage = '*Feedback is required';
//       return;
//     }

//     this.feedbackService.sendFeedback(this.feedback, {responseType: 'text'}).subscribe(
//       () => {
//         alert('Feedback successfully added!');
//         this.router.navigate(['/user/addFeedback']);
//       },
//       (error: HttpErrorResponse) => {
//         console.error('Error adding feedback:', error);
//       }
//     );

//   }
// }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  feedback: Feedback = {
    UserId: 0,
    FeedbackText: '',
    Date: undefined,
  };
  errorMessage: string = '';

  constructor(private feedbackService: FeedbackService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.feedback.UserId = +localStorage.getItem('userId');
    //this.feedback.username = localStorage.getItem('username');
    this.feedback.Date = new Date();
  }

  // addFeedback() {
  //   if (!this.feedback.FeedbackText.trim()) {
  //     this.errorMessage = '*Feedback is required';
  //     return;
  //   }

  //   this.feedbackService.sendFeedback(this.feedback, {responseType: 'text'}).subscribe(
  //     () => {
  //       alert('Feedback successfully added!');
  //       this.router.navigate(['/user/addFeedback']); // Redirect to the same component
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.error('Error adding feedback:', error);
  //     }
  //   );
  // }

  addFeedback() {
  if (!this.feedback.FeedbackText.trim()) {
    this.errorMessage = '*Feedback is required';
    return;
  }

  this.feedbackService.sendFeedback(this.feedback, { responseType: 'text' }).subscribe(
    () => {
      alert('Feedback successfully added!');
      this.router.navigate(['/user/viewFeedback']).then(() => {
        setTimeout(() => {
          this.router.navigate(['/user/addFeedback']);
        }, 100);
      });
    },
    (error: HttpErrorResponse) => {
      console.error('Error adding feedback:', error);
    }
  );
}

}
