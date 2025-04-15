import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MentorshipService } from 'src/app/services/mentorship.service';
// import {MatSnackBar} from '@angular/material/snack-bar';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

@Component({
  selector: 'app-creatementorshipprogram',
  templateUrl: './creatementorshipprogram.component.html',
  styleUrls: ['./creatementorshipprogram.component.css']
})
export class CreatementorshipprogramComponent implements OnInit {
  // mentorshipForm: FormGroup;
  // isSubmitting = false;
  // constructor(private fb: FormBuilder, private mentorshipService: MentorshipService, private snackBar: MatSnackBar) 
  // {
  //   this.mentorshipForm = this.fb.group({
  //     programName: ['',Validators.required],
  //     description: ['',Validators.required],
  //     fieldOfMentorship: ['',Validators.required],
  //     durationInMonths: ['',[Validators.required, Validators.min(1)]],
  //     mentorName: ['',Validators.required],
  //     experienceLevel: ['',Validators.required],
  //     modelOfMentorship: ['',Validators.required]
  //   });
  // }

  // onSubmit():void{
  //   if(this.mentorshipForm.invalid){
  //     this.snackBar.open('All Fields are required','Close',{duration: 3000});
  //     return;
  //   }

  //   this.isSubmitting = true;

  //   const mentorshipProgram: MentorshipProgram = this.mentorshipForm.value;

  //   this.mentorshipService.addMentorshipProgram(mentorshipProgram).subscribe({
  //     next: ()=>{
  //       this.snackBar.open('Successfully Added!','Close',{duration: 3000});
  //       this.mentorshipForm.reset();
  //       this.isSubmitting = false;
  //     },
  //     error: (error) => {
  //       this.isSubmitting = false;
  //       if(error.status === 409){
  //         this.snackBar.open('Program with the same name already exists','Close',{duration: 3000});
  //       }else{
  //         this.snackBar.open('Something went wrong. Please try again.','Close',{duration: 3000});
  //       }
  //     }
  //   });
  // }

  ngOnInit(): void {
  }

}
