import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  constructor(private feedbackService: FeedbackService) { }
  feedbackText = '';
  showValidation = false;
  showPopup = false;

  ngOnInit(): void {
  }
  submitFeedback(): void {
    if (!this.feedbackText.trim()) {
      this.showValidation = true;
      return;
    }
    this.showValidation = false;
    const userId = Number(localStorage.getItem('userId'));
    const feedback: Feedback = {
      UserId: userId,
      FeedbackText: this.feedbackText,
      Date: new Date()
    };
    this.feedbackService.sendFeedback(feedback).subscribe({
      next: () => {
        this.showPopup = true;
        this.feedbackText = '';
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error submitting feedback:', err);
        if (err.status === 0) {
          console.error('A client-side or network error occurred:', err.error);
        } else {
          console.error(`Backend returned code ${err.status}, body was: `, err.error);
        }
      }
    });
  }
  
  closePopup()
  {
    this.showPopup = false;
    this.feedbackText = '';
  }
}
