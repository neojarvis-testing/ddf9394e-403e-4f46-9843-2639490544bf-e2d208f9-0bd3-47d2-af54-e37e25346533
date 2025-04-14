import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
 selector: 'app-usernav',
 templateUrl: './usernav.component.html',
 styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
 userName: string | null = '';
 constructor(private router: Router) {}
 ngOnInit(): void {
  this.userName = localStorage.getItem('userName'); // assuming userName is saved at login
 }
 logout(): void {
  localStorage.clear();
  this.router.navigate(['/login']);
 }
}