import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

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
