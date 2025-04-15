import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  checkRole() {
    this.secretKeyRequired = this.user.UserRole === 'Admin';
  }

  register() {
    if (this.user.Password === this.confirmPassword) {
      // Logic for registration (e.g., API call)
      console.log('User registered successfully:', this.user);

      // Navigate to login page after registration
      this.router.navigate(['/login']);
    } else {
      console.log('Passwords do not match.');
    }
  }
}