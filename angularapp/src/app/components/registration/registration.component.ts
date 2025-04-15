import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
 
  newUser:User={
    Email:"",
    Password:"",
    Username:"",
    MobileNumber:"",
    UserRole:""
  }
  err:string="";
  showPassword:boolean=false;
  confirmPassword:string="";
  inputSecretKey:string='';
  SECRETKEY:string= '@RegisterAdmin@'
  checkUserExists:boolean=false;
  constructor(private authService:AuthService,private router:Router) { }
 
  ngOnInit(): void {
  }
 
  register(){
  
    this.authService.register(this.newUser).subscribe((res)=>{
      console.log(res);
      this.router.navigate(["/login"]);
      Swal.fire({
        title: 'Success!',
        text: 'Registration Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
      this.router.navigate([`/login`]);
    },
    (error)=>{
      this.checkUserExists=true;
      this.err=error.error;
      Swal.fire({
        title: 'Error!',
        text: 'Registration Failed. Please try again.',
        icon: 'error',
        timer: 1500,
        showConfirmButton: false
      });
    });
 
  }

  matchSecretKey():boolean
  {
   
    return (this.SECRETKEY === this.inputSecretKey);
  }

 
}