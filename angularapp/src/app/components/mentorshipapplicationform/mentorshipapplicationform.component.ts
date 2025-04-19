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

    reader.onload = (event) => {
     const img = new Image();
     img.src = event.target?.result as string;
     img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800; // You can adjust this for your needs
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      // Compress to JPEG, quality between 0-1
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.6); // Adjust quality as needed
      this.applicationForm.patchValue({
       image: compressedBase64
      });
      this.fileError = '';
     };
     img.onerror = () => {
      this.fileError = 'Error processing image.';
      this.showErrorPopup(this.fileError);
     };
    };
    reader.onerror = () => {
     this.fileError = 'Error reading file.';
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
            this.router.navigate(['/user/viewmentorshipprogram']);
          }
        });
      },
      (error) => {
        console.error('Error submitting application', error);
        this.showErrorPopup('An error occurred while submitting the application.');
      }
    );
  }

 
  goBack(): void {
    const applied = localStorage.getItem(`applied_${this.programId}`);
    if (!applied) {
      localStorage.setItem(`applied_${this.programId}`, 'false');
    }
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


