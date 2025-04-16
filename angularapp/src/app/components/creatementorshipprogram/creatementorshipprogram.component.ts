import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creatementorshipprogram',
  templateUrl: './creatementorshipprogram.component.html',
  styleUrls: ['./creatementorshipprogram.component.css']
})
export class CreatementorshipprogramComponent {

  isSubmitting = false;

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      alert('All Fields are required');
      return;
    }

    this.isSubmitting = true;
    const mentorshipProgram: MentorshipProgram = form.value;

    this.mentorshipService.addMentorshipProgram(mentorshipProgram).subscribe({
      next: () => {
        alert('Successfully Added!');
        form.reset();
        this.isSubmitting = false;
      },
      error: (error) => {
        this.isSubmitting = false;
        if (error.status === 409) {
          alert('Program with the same name already exists');
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/viewmentorshipprogram']);
  }
}
