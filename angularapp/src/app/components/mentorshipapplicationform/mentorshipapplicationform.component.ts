import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentorshipapplicationform',
  templateUrl: './mentorshipapplicationform.component.html',
  styleUrls: ['./mentorshipapplicationform.component.css']
})
export class MentorshipapplicationformComponent implements OnInit {

  applicationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      reason: ['', Validators.required],
      goal: ['', Validators.required],
      portfolio: ['', Validators.required],
      image: [null]
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.applicationForm.patchValue({
      image: file
    });
    console.log('Selected File:', file);
  }

  onSubmit(): void {
    if (this.applicationForm.invalid) {
      alert('All fields are required');
    } else {
      alert('Successfully Submitted!');
      this.router.navigate(['/user/viewmentorshipprogram']);
    }
  }

  goBack(): void {
    this.router.navigate(['/user/viewmentorshipprogram']);
  }
}
