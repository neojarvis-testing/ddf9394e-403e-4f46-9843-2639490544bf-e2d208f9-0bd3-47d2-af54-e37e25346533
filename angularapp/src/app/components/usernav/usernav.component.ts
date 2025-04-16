import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {

  constructor(private router: Router) {}
 
  confirmLogout() {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.logout();
    }
  }
 
  logout(): void {
    // Clear user session or token
    // Navigate to login or home page after logout
    this.router.navigate(['/login']);
  }

  onDropdownChange(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue) {
      this.router.navigate([`/user/${selectedValue}`]);
    }
  }
}