import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user = {
    Username: '',
    Email: '',
    Password: '',
    MobileNumber: '',
    UserRole: '',
    SecretKey: ''
  };
  confirmPassword = '';
  secretKeyRequired = false;
  secretKeyMisMatch = false;
  errorMessage: string = '';
  readonly adminSecretKey = 'Zion';

  constructor(private router: Router, private authService: AuthService) {}

  checkRole() {
    this.secretKeyRequired = this.user.UserRole === 'Admin';
  }

  // register() {
  //   if (this.user.Password === this.confirmPassword) {
  //     // Logic for registration (e.g., API call)
  //     console.log('User registered successfully:', this.user);

  //     // Navigate to login page after registration
  //     this.router.navigate(['/login']);
  //   } else {
  //     console.log('Passwords do not match.');
  //   }
  // }

  onSubmit(form: NgForm): void {
    if (this.user.Password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    if (this.user.UserRole === 'Admin' && this.user.SecretKey !== this.adminSecretKey) {
      this.errorMessage = 'Invalid Secret Key';
      return;
    }

    this.authService.register(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => {
        this.errorMessage = err.status === 409 ? 'User already exists' : 'Registration failed';
      }
    });
  }
}

