import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    Email: '',
    Password: ''
   };
  
  
  
   loginError: string = '';
  
  ngOnInit(): void {
    
  }
  
   constructor(private authService: AuthService, private router: Router) {}
  
  
  
   onSubmit(form: any): void {
  
    if (form.valid) {
  
     this.authService.login(this.loginData).subscribe({
  
      next: (response) => {
  
       if (response.token) {
  
        localStorage.setItem('token', response.token);
  
        localStorage.setItem('role', response.role);
  
        localStorage.setItem('userId', response.userId);
  
  
  
        if (response.role === 'Admin') {
  
         this.router.navigate(['/admin/home']);
  
        } else {
  
         this.router.navigate(['/user/home']);
  
        }
  
       }
  
      },
  
      error: () => {
  
       this.loginError = "Invalid email or password";
  
      }
  
     });
  
    }
  
   }
}
