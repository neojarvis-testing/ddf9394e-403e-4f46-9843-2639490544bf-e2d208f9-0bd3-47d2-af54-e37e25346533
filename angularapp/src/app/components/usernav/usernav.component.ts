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
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigate(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;
    this.router.navigate([selectedValue]);
  }
}
