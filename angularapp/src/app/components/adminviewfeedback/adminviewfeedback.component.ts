import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { User } from 'src/app/models/user.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import { AuthService } from 'src/app/services/auth.service';
 
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
  this.authService.getAllUsers().subscribe(users => {
   this.users = users;
   this.feedbackService.getFeedbacks().subscribe(data => {
    this.feedbacks = data;
   });
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