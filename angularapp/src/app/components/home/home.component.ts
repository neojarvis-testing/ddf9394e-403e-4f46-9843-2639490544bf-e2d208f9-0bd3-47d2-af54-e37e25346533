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
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
 
export class HomeComponent implements OnInit {
  myIndex = 0;
  constructor(private authService:AuthService) { }
 
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
}

