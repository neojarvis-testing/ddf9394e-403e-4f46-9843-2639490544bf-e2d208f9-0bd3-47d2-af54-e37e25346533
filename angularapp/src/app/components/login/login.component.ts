// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { Login } from 'src/app/models/login.model';
// import { AuthService } from 'src/app/services/auth.service';
// import  Swal  from 'sweetalert2';
 
// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
 
//   userLogin:Login={
//     "Email":"",
//     "Password":""
//   }
//   checkEmailandPassword:boolean=false;
//   role:string='';
//   showPassword:boolean=false;
//   constructor(private authService:AuthService,private router:Router) { }
 
//   ngOnInit(): void {
//   }
 
//   addlogin()
//   {
//     this.authService.login(this.userLogin).subscribe((res)=>{
//       console.log(res);
//       localStorage.setItem("token",res.token);
//       this.authService.isRole();
//       this.role = localStorage.getItem('userRole');
//       if(this.role ==="Admin")
//       {
//         this.router.navigate([`/adminnav`]);
//       }
//       else
//       {
//         this.router.navigate([`/usernav`]);
//       }
//       console.log(this.role);
//       if(this.role=="Admin")
//       this.router.navigate([`/admin`]);
//       else
//       this.router.navigate(['/user']);
//       Swal.fire({
//         title: 'Success!',
//         text: 'Login Successful!',
//         icon: 'success',
//         timer: 1500,
//         showConfirmButton: false
//       });
 
//     },
//     error=>{
//       this.checkEmailandPassword=true;
//       Swal.fire({
//         title: 'Error!',
//         text: 'Login Failed. Please try again.',
//         icon: 'error',
//         timer: 1500,
//         showConfirmButton: false
//       });
//     })
//   }
 
 
// }

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('navbarMenu') navbarMenu!: ElementRef;
  @ViewChild('formPopup') formPopup!: ElementRef;

  userLogin: Login = {
    "Email": "",
    "Password": ""
  };
  checkEmailandPassword: boolean = false;
  role: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // Add login functionality
  addlogin() {
    this.authService.login(this.userLogin).subscribe((res) => {
      console.log(res);
      localStorage.setItem("token", res.token);
      this.authService.isRole();
      this.role = localStorage.getItem('userRole') || '';
      if (this.role === "Admin") {
        this.router.navigate([`/adminnav`]);
      } else {
        this.router.navigate([`/usernav`]);
      }
      console.log(this.role);
      if (this.role === "Admin")
        this.router.navigate([`/admin`]);
      else
        this.router.navigate(['/user']);
      Swal.fire({
        title: 'Success!',
        text: 'Login Successful!',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

    },
      error => {
        this.checkEmailandPassword = true;
        Swal.fire({
          title: 'Error!',
          text: 'Login Failed. Please try again.',
          icon: 'error',
          timer: 1500,
          showConfirmButton: false
        });
      })
  }

  // Toggle mobile menu
  toggleMenu() {
    this.navbarMenu.nativeElement.classList.toggle('show-menu');
  }

  // Close mobile menu
  closeMenu() {
    this.navbarMenu.nativeElement.classList.remove('show-menu');
  }

  // Toggle login popup
  togglePopup() {
    document.body.classList.toggle('show-popup');
  }

  // Close login popup
  closePopup() {
    document.body.classList.remove('show-popup');
  }

  // Toggle between signup and login forms in the popup
  toggleSignup(event: Event, id: string) {
    event.preventDefault();
    if (id === 'signup-link') {
      this.formPopup.nativeElement.classList.add('show-signup');
    } else {
      this.formPopup.nativeElement.classList.remove('show-signup');
    }
  }
  
   onLogin() {
     // Handle login logic here
     }
    
     onSignup() {
     // Handle signup logic here
     }
    
}
