import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';
import { ViewmentorshipprogramComponent } from '../viewmentorshipprogram/viewmentorshipprogram.component';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-admineditmentorshipprogram',
  templateUrl: './admineditmentorshipprogram.component.html',
  styleUrls: ['./admineditmentorshipprogram.component.css']
})
export class AdmineditmentorshipprogramComponent implements OnInit {

  programId: number;
  
  program: MentorshipProgram = {
    ProgramName: '',
    Description: '',
    FieldOfMentorship: '',
    DurationInMonths: 0,
    MentorName: '',
    ExperienceLevel: '',
    ModeOfMentorship: ''
  };

  constructor(private route: ActivatedRoute, private router: Router, private mentorshipService: MentorshipService) { }

  ngOnInit(): void {
    this.programId = +this.route.snapshot.paramMap.get('id');
    console.log(this.programId);

    this.mentorshipService.getMentorshipProgramById(this.programId).subscribe(data => {
      this.program = data;
    });
    console.log(this.program);
  }


  onSubmit(): void {
    if (this.program.ProgramName && this.program.Description && this.program.FieldOfMentorship &&
        this.program.DurationInMonths && this.program.MentorName && this.program.ExperienceLevel &&
        this.program.ModeOfMentorship) {
      this.mentorshipService.updateMentorshipProgram(this.programId, this.program).subscribe(() => {
        Swal.fire({
          title: 'Success!',
          text: 'Program Updated Successfully!',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['admin/viewmentorshipprogram']);
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  goBack(): void {
    this.router.navigate(['admin/viewmentorshipprogram']);
  }
}
