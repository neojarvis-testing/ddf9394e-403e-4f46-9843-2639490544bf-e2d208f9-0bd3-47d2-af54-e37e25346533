import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbackText: string = '';
  showValidation: boolean = false;
  showPopup: boolean = false;
  showDeleteConfirm: boolean = false;
  feedbacks: Feedback[] = [];
  selectedFeedback: Feedback | null = null;

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

  confirmDelete(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showDeleteConfirm = true;
  }

  deleteFeedback(): void {
    if (this.selectedFeedback) {
      this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId).subscribe({
        next: () => {
          this.loadFeedback(); // Refresh the feedback list
          this.showDeleteConfirm = false;
          this.selectedFeedback = null;
        },
        error: (err) => {
          console.error('Error deleting feedback:', err);
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.selectedFeedback = null;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
