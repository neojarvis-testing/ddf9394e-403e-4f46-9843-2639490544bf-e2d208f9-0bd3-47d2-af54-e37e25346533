import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {
  feedbacks = ['Feedback 1', 'Feedback 2']; // Should be fetched from API
  selectedFeedback = '';
  showDeleteConfirm = false;
  constructor() { }

  ngOnInit(): void {
  }
  confirmDelete(feedback: string)
  {
    this.selectedFeedback = feedback;
    this.showDeleteConfirm = true;
  }
  deleteFeedback()
  {
    this.feedbacks = this.feedbacks.filter(f => f !== this.selectedFeedback);
    this.showDeleteConfirm = false;
    this.selectedFeedback = '';
  }
  cancelDelete() 
  {
  this.showDeleteConfirm = false;
  }
}



