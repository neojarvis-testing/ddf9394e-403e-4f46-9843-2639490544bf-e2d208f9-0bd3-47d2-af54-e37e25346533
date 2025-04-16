import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackIdtoDelete: number;
  feedbacks: Feedback[] = [];
  selectedFeedbackId: number;
  isPopUpOpen: boolean;
  UserId: number;

  constructor(private feedbackService: FeedbackService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.UserId = +localStorage.getItem('userId'); 
    console.log(this.UserId);

    this.feedbackService.getAllFeedbacksByUserid(this.UserId).subscribe(data => { 
      this.feedbacks = data;
    });
  }
  
  openDeletePopUp(feedbackId: number): void {
    this.feedbackIdtoDelete = feedbackId;
    this.isPopUpOpen = true;
  }

  closeDeletePopUp(): void {
    this.isPopUpOpen = false;
    this.feedbackIdtoDelete = null;
  }

  deleteFeedback() {
    if (this.feedbackIdtoDelete !== null) {
      this.feedbackService.deleteFeedback(this.feedbackIdtoDelete).subscribe(() => {
        this.feedbacks = this.feedbacks.filter(feedback => feedback.FeedbackId !== this.feedbackIdtoDelete);
        this.closeDeletePopUp();
      });
    }
  }
}