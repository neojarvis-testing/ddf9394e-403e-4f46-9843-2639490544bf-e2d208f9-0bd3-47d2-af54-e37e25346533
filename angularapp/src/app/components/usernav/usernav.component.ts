import { Component } from '@angular/core';

import { Router } from '@angular/router';



@Component({

 selector: 'app-usernav',

 templateUrl: './usernav.component.html',

 styleUrls: ['./usernav.component.css']

})

export class UsernavComponent {

 constructor(private router: Router) {}



 logout(): void {

  // Clear user session or token

  localStorage.clear();

  this.router.navigate(['/login']);

 }


}