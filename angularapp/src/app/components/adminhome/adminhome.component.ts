import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

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
