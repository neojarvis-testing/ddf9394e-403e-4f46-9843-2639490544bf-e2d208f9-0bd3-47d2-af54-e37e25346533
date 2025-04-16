
// import { Component, OnInit } from '@angular/core';
 
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
 
//   constructor() { }
 
//   ngOnInit(): void {
//   }
 
// }

import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
 
export class HomeComponent implements OnInit {
  myIndex = 0;
  constructor(private authService:AuthService,) { }
 
  ngOnInit(): void {
    // this.carousel();
  }
  isLoggedIn():boolean
  {
    return this.authService.isLoggedIn();
  }
  isAdmin():boolean
  {
    return this.authService.isAdmin();
  }
  isUser():boolean
  {
    return this.authService.isUser();
  }
  // carousel(): void {
  //   const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
  //   for (let i = 0; i < slides.length; i++) {
  //     slides[i].style.display = "none";
  //   }
  //   this.myIndex++;
  //   if (this.myIndex > slides.length) { this.myIndex = 1; }
  //   slides[this.myIndex - 1].style.display = "block";
  //   setTimeout(() => this.carousel(), 2000); // Change image every 2 seconds
  // }

}

