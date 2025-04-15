import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  user: User = {
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
  correctSecretKey="Zion";

  constructor(private router: Router, private authService: AuthService) {}

  checkRole() {
    this.secretKeyRequired = this.user.UserRole === 'Admin';
  }

  register() {
    if (this.user.Password === this.confirmPassword) {
      if (this.secretKeyRequired && this.user.SecretKey !== this.correctSecretKey) {
        this.secretKeyMisMatch = true;
        console.log('Secret key does not match.');
      } else {
        this.secretKeyMisMatch = false;
       this.authService.register(this.user).subscribe(
          response => {
            console.log('User registered successfully:', response);
            // Navigate to login page after successful registration
            this.router.navigate(['/login']);
          },
          error => {
            console.log('Registration failed:', error);
          }
        );
      }
    } else {
      console.log('Passwords do not match.');
    }
  }
}
