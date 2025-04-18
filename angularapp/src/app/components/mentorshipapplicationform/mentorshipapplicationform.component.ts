import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
@Component({
  selector: 'app-mentorshipapplicationform',
  templateUrl: './mentorshipapplicationform.component.html',
  styleUrls: ['./mentorshipapplicationform.component.css']
})
export class MentorshipapplicationformComponent implements OnInit {
  programId: number;
  userId = Number(localStorage.getItem('userId'));
  date = new Date();
  applicationForm: FormGroup;
  fileError: string = '';
  programs: any[] = [];
  filteredPrograms: any[] = [];
  application: MentorshipApplication = {
    UserId: 0,
    MentorshipProgramId: 0,
    ReasonForApplying: '',
    CareerGoals: '',
    ProfileImage: '',
    PortfolioLink: '',
    ApplicationStatus: 'Pending',
    ApplicationDate: this.date.toISOString().split('T')[0]
  };
 
  constructor(
    private route: ActivatedRoute,
    private mentorshipService: MentorshipService,
    private router: Router,
    private fb: FormBuilder
  ) {
    route.params.subscribe((params) => {
      this.programId = +params['id'];
    });
  }
 
  ngOnInit(): void {
    this.applicationForm = this.fb.group({
      reason: ['', Validators.required],
      goal: ['', Validators.required],
      portfolio: ['', Validators.required],
      image: [null, Validators.required]
    });
  }
 
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const fileType = file.type.toLowerCase();
      if (['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
        this.convertToBase64(file);
        this.fileError = '';
      } else {
        this.fileError = 'Only .jpg, .jpeg, and .png files are allowed.';
        this.applicationForm.patchValue({ image: null });
        (event.target as HTMLInputElement).value = '';
        this.showErrorPopup(this.fileError);
      }
    } else {
      this.fileError = 'Image is required.';
    }
  }
 
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.applicationForm.patchValue({
        image: reader.result as string
      });
    };
    reader.onerror = () => {
      this.fileError = 'Error converting file to Base64.';
      this.showErrorPopup(this.fileError);
    };
    reader.readAsDataURL(file);
  }
 
  onSubmit(): void {
    if (this.applicationForm.invalid || this.fileError) {
      if (!this.applicationForm.get('image')?.value) {
        this.fileError = 'Image is required.';
        this.showErrorPopup(this.fileError);
      }
      return;
    }
 
    this.application.UserId = this.userId;
    this.application.MentorshipProgramId = this.programId;
    this.application.ReasonForApplying = this.applicationForm.get('reason')?.value;
    this.application.CareerGoals = this.applicationForm.get('goal')?.value;
    this.application.ProfileImage = this.applicationForm.get('image')?.value;
    this.application.PortfolioLink = this.applicationForm.get('portfolio')?.value;
 
    console.log('Form submitted', this.application);
    this.mentorshipService.addMentorshipApplication(this.application).subscribe(
      (data) => {
        Swal.fire({
          title: 'Successfully Submitted!',
          text: 'Your application has been submitted successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.setItem(`applied_${this.programId}`, 'true');
            this.updateProgramStatus(this.programId); 
            this.router.navigate(['/user/viewmentorshipprogram']);
          }
        });
      },
      (error) => {
        console.error('Error submitting application', error);
      }
    );
  }
 
  
updateProgramStatus(programId: number): void {
    const program = this.filteredPrograms.find(p => p.MentorshipProgramId === programId);
    if (program) {
    program.applied = true;
    }
  }
  
  goBack(): void {
    this.router.navigate(['/user/viewmentorshipprogram']);
  }
 
  showErrorPopup(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Error!',
      text: message,
      confirmButtonColor: '#e74c3c'
    });
  }
}


// import { Component, OnInit } from '@angular/core';
// import Swal from 'sweetalert2';
// import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
// import { ActivatedRoute, Router } from '@angular/router';
// import { MentorshipService } from 'src/app/services/mentorship.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-mentorshipapplicationform',
//   templateUrl: './mentorshipapplicationform.component.html',
//   styleUrls: ['./mentorshipapplicationform.component.css']
// })
// export class MentorshipapplicationformComponent implements OnInit {
//   programId: number;
//   userId = Number(localStorage.getItem('userId'));
//   date = new Date();
//   applicationForm: FormGroup;
//   fileError: string = '';
//   programs: any[] = [];
//   filteredPrograms: any[] = [];
//   searchTerm: string = '';

//   application: MentorshipApplication = {
//     UserId: 0,
//     MentorshipProgramId: 0,
//     ReasonForApplying: '',
//     CareerGoals: '',
//     ProfileImage: '',
//     PortfolioLink: '',
//     ApplicationStatus: 'Pending',
//     ApplicationDate: this.date.toISOString().split('T')[0]
//   };

//   constructor(
//     private route: ActivatedRoute,
//     private mentorshipService: MentorshipService,
//     private router: Router,
//     private fb: FormBuilder
//   ) {
//     route.params.subscribe((params) => {
//       this.programId = +params['id'];
//     });
//   }

//   ngOnInit(): void {
//     this.applicationForm = this.fb.group({
//       reason: ['', Validators.required],
//       goal: ['', Validators.required],
//       portfolio: ['', Validators.required],
//       image: [null, Validators.required]
//     });

//     this.loadPrograms();
//   }

//   loadPrograms(): void {
//     this.mentorshipService.getAllMentorshipPrograms().subscribe((programs) => {
//       this.programs = programs;
//       this.filteredPrograms = programs;
//     });
//   }

//     onFileChange(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       const fileType = file.type.toLowerCase();
//       if (['image/jpeg', 'image/png', 'image/jpg'].includes(fileType)) {
//         this.convertToBase64(file);
//         this.fileError = '';
//       } else {
//         this.fileError = 'Only .jpg, .jpeg, and .png files are allowed.';
//         this.applicationForm.patchValue({ image: null });
//         (event.target as HTMLInputElement).value = '';
//         this.showErrorPopup(this.fileError);
//       }
//     } else {
//       this.fileError = 'Image is required.';
//     }
//   }
 
//   convertToBase64(file: File): void {
//     const reader = new FileReader();
//     reader.onload = () => {
//       this.applicationForm.patchValue({
//         image: reader.result as string
//       });
//     };
//     reader.onerror = () => {
//       this.fileError = 'Error converting file to Base64.';
//       this.showErrorPopup(this.fileError);
//     };
//     reader.readAsDataURL(file);
//   }

//   filterPrograms(): void {
//     this.filteredPrograms = this.programs.filter(program =>
//       program.ProgramName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
//       program.MentorName.toLowerCase().includes(this.searchTerm.toLowerCase())
//     );
//   }

//   apply(program: any, programId: number): void {
//     this.router.navigate(['/user/mentorshipapplicationform', programId]);
//   }

//   onSubmit(): void {
//     if (this.applicationForm.invalid || this.fileError) {
//       if (!this.applicationForm.get('image')?.value) {
//         this.fileError = 'Image is required.';
//         this.showErrorPopup(this.fileError);
//       }
//       return;
//     }

//     this.application.UserId = this.userId;
//     this.application.MentorshipProgramId = this.programId;
//     this.application.ReasonForApplying = this.applicationForm.get('reason')?.value;
//     this.application.CareerGoals = this.applicationForm.get('goal')?.value;
//     this.application.ProfileImage = this.applicationForm.get('image')?.value;
//     this.application.PortfolioLink = this.applicationForm.get('portfolio')?.value;

//     this.mentorshipService.addMentorshipApplication(this.application).subscribe(
//       (data) => {
//         Swal.fire({
//           title: 'Successfully Submitted!',
//           text: 'Your application has been submitted successfully.',
//           icon: 'success',
//           confirmButtonText: 'OK'
//         }).then((result) => {
//           if (result.isConfirmed) {
//             localStorage.setItem(`applied_${this.programId}`, 'true');
//             this.updateProgramStatus(this.programId);
//             this.router.navigate(['/user/viewmentorshipprogram']);
//           }
//         });
//       },
//       (error) => {
//         console.error('Error submitting application', error);
//       }
//     );
//   }

//   updateProgramStatus(programId: number): void {
//     const program = this.programs.find(p => p.MentorshipProgramId === programId);
//     if (program) {
//       program.applied = true;
//     }
//   }

//   goBack(): void {
//     this.router.navigate(['/user/viewmentorshipprogram']);
//   }

//   showErrorPopup(message: string): void {
//     Swal.fire({
//       icon: 'error',
//       title: 'Error!',
//       text: message,
//       confirmButtonColor: '#e74c3c'
//     });
//   }
// }



