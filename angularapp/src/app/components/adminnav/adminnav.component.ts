import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 selector: 'app-adminnav',
 templateUrl: './adminnav.component.html',
 styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  username: string = 'Admin';
  role: string = 'Admin';
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
 
}