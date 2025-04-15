import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = {
    Email: '',
    Password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginModel).subscribe(
      response => {
        if (response) {
          console.log('Login successful', response);
          // Navigate based on user role
          if (response.role === 'Admin') {
            this.router.navigate(['/adminnav']);
          } else {
            this.router.navigate(['/usernav']);
          }
        } else {
          console.log('Login failed: No response received');
        }
      },
      error => {
        console.log('Login failed', error);
      }
    );
  }
}
