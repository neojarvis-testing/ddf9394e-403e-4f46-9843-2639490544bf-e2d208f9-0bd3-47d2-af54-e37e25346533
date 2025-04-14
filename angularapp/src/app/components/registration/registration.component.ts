import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = {
    UserId: 0,
    Email: '',
    Password: '',
    Username: '',
    MobileNumber: '',
    UserRole: '',
    SecretKey: ''
  };

  confirmPassword:'';
  passwordMisMatch: boolean = false;
  secretKeyMisMatch: boolean = false;
  secretKeyRequired: boolean = false;
  adminSecretKey = 'Zion'; //Hardcode

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  checkRole()
  {
    if(this.user.UserRole == 'Admin')
    {
      this.secretKeyRequired = true;
    }
  }

  register()
  {
    alert('added successfully');
    if(this.user.Password != this.confirmPassword && this.user.SecretKey != this.adminSecretKey)
    {
      this.passwordMisMatch = true;
      this.secretKeyMisMatch = true;
      return;
    }

    this.authService.register(this.user).subscribe( data =>{
      this.user = data;
      this.router.navigate(['/login']);
    });
  }
}




