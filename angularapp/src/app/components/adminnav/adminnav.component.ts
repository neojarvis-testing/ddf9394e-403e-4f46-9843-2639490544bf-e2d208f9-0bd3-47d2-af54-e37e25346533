import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
 selector: 'app-adminnav',
 templateUrl: './adminnav.component.html',
 styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
userName: any;
logout() {
throw new Error('Method not implemented.');
}
 
  constructor() { }
 
  ngOnInit(): void {
  }
 
}