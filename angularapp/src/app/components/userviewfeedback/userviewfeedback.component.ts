import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // 1. Import Router
import { FeedbackService } from 'src/app/services/feedback.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks: Feedback[] = [];
  showDeleteConfirm: boolean = false;
  selectedFeedback: Feedback | null = null;

  constructor(private feedbackService: FeedbackService, private router: Router) { } // 2. Inject Router

  ngOnInit(): void {
    this.loadFeedback();
  }

  loadFeedback(): void {
    this.feedbackService.getFeedbacks().subscribe(data => {
      this.feedbacks = data;
    });
  }

  confirmDelete(feedback: Feedback): void {
    this.selectedFeedback = feedback;
    this.showDeleteConfirm = true;
  }

  deleteFeedback(): void {
    if (this.selectedFeedback) {
      this.feedbackService.deleteFeedback(this.selectedFeedback.FeedbackId).subscribe(()=>{
          this.showDeleteConfirm = false;
          this.selectedFeedback = null;
          this.router.navigate(['/userviewfeedback']); // 3. Navigate to userviewfeedback
        (err: any) => {
          console.error('Error deleting feedback:', err);
        }
    });
    }
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.selectedFeedback = null;
  }
}
