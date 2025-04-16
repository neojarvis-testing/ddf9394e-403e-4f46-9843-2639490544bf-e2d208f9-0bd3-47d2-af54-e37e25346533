import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorshipapplicationform',
  templateUrl: './mentorshipapplicationform.component.html',
  styleUrls: ['./mentorshipapplicationform.component.css']
})
export class MentorshipapplicationformComponent implements OnInit {

  application = {
    reason: '',
    goal: '',
    portfolio: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onFileChange(event: any): void {
    const file = event.target.files[0];
    console.log('Selected File:', file);
  }

  onSubmit(): void {
    if (!this.application.reason || !this.application.goal || !this.application.portfolio) {
      alert('All fields are required');
    } else {
      alert('Successfully Submitted!');
      this.router.navigate(['/userviewmentorshipprogram']);
    }
  }

  goBack(): void {
    this.router.navigate(['/userviewmentorshipprogram']);
  }
}
