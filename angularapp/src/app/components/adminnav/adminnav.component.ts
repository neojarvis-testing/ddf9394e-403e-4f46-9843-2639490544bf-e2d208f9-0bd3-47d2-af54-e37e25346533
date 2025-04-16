import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 selector: 'app-adminnav',
 templateUrl: './adminnav.component.html',
 styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
userName: any;
logout(): void {
  // Clear user session or token
  localStorage.clear();
  this.router.navigate(['/login']);
}
 
  constructor(private router:Router) { }
 
  ngOnInit(): void {
  }
 
}