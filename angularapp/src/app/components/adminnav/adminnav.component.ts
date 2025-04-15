import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 selector: 'app-adminnav',
 templateUrl: './adminnav.component.html',
 styleUrls: ['./adminnav.component.css']
})

export class AdminnavComponent implements OnInit {
 userName: string | null = '';
 constructor(private router: Router) {}
 ngOnInit(): void {
  this.userName = localStorage.getItem('userName'); // assuming userName is stored at login
 }
 logout(): void {
  localStorage.clear();
  this.router.navigate(['/login']);
 }

}