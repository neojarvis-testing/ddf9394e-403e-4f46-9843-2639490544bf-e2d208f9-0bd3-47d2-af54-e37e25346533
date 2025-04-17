import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';

@Component({
  selector: 'app-mentorshipapplicationform',
  templateUrl: './mentorshipapplicationform.component.html',
  styleUrls: ['./mentorshipapplicationform.component.css']
})
export class MentorshipapplicationformComponent implements OnInit {
  applicationForm: FormGroup;
  programId: number;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private mentorshipService: MentorshipService
  ) {}

  ngOnInit(): void {
    this.programId = +this.route.snapshot.paramMap.get('programId');
    this.applicationForm = this.fb.group({
      reason: ['', Validators.required],
      goal: ['', Validators.required],
      portfolio: [''], // No Validators.required here
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
      const userId = Number(localStorage.getItem('userId')); // Convert to number
      const application: MentorshipApplication = {
        UserId: userId,
        MentorshipProgramId: this.programId,
        ReasonForApplying: this.applicationForm.value.reason,
        CareerGoals: this.applicationForm.value.goal,
        ProfileImage: this.applicationForm.value.image,
        PortfolioLink: this.applicationForm.value.portfolio,
        ApplicationStatus: 'Pending',
        ApplicationDate: new Date().toISOString()
      };

      this.mentorshipService.addMentorshipApplication(application).subscribe(response => {
        alert('Successfully Submitted!');
        this.router.navigate(['user/viewmentorshipprogram']);
      }, error => {
        console.error('Error submitting application', error);
      });
    }
  }

  goBack(): void {
    const programId = this.route.snapshot.paramMap.get('programId');
    console.log(`Removing applied state for program ID: ${programId}`);
    localStorage.removeItem(`applied_${programId}`);
    this.router.navigate(['user/viewmentorshipprogram']);
  }
}
