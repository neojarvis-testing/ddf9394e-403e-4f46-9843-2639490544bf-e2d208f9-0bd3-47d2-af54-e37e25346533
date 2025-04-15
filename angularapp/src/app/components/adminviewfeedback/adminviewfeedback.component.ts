import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
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
  feedbacks: Feedback[] = [
    // {
    //   FeedbackId: 1,
    //   UserId: 1,
    //   FeedbackText: 'good',
    //   Date: new Date('2003-01-30')
    // }
  ];
  
  selectedUser: Feedback | null = null;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
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
    this.feedbackService.sendFeedback(feedback).subscribe({
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
  }

  showProfile(feedback: Feedback): void {
    this.selectedUser = feedback;
  }

  closePopup(): void {
    this.showPopup = false;
  }

  closeProfile(): void {
    this.selectedUser = null;
  }
}





