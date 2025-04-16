import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';
import { ViewmentorshipprogramComponent } from '../viewmentorshipprogram/viewmentorshipprogram.component';


@Component({
  selector: 'app-admineditmentorshipprogram',
  templateUrl: './admineditmentorshipprogram.component.html',
  styleUrls: ['./admineditmentorshipprogram.component.css']
})
export class AdmineditmentorshipprogramComponent implements OnInit {

  programId!: number;


  program: MentorshipProgram = {
    ProgramName: '',
    Description: '',
    FieldOfMentorship: '',
    DurationInMonths: 0,
    MentorName: '',
    ExperienceLevel: '',
    ModeOfMentorship: '',
  };

  constructor(private route: ActivatedRoute, private router: Router, private mentorshipService: MentorshipService) { }

  ngOnInit(): void {
    this.programId = Number(this.route.snapshot.paramMap.get('id'));
    this.mentorshipService.getMentorshipProgramById(this.programId).subscribe((data) => {
      this.program = data;
    });
  }

  onSubmit(): void {
    this.mentorshipService.updateMentorshipProgram(this.programId, this.program).subscribe(() => {
      alert('Program updated successfully!');
      this.router.navigate(['/viewmentorshipprogram']);
    });

  }

  goBack(): void {
    this.router.navigate(['/viewmentorshipprogram']);
  }
}

