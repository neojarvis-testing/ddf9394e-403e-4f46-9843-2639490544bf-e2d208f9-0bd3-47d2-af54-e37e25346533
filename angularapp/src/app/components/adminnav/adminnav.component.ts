import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
@Component({
 selector: 'app-adminnav',
 templateUrl: './adminnav.component.html',
 styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {

  userName:string;
  userRole:string;
  constructor(private router:Router, private authService:AuthService) { }

 
  ngOnInit(): void {
    this.userName=localStorage.getItem('userName');
    this.userRole=localStorage.getItem('userRole');

  }

  onDropdownChange(event: any): void {
    const selectedValue = event.target.value;
    if (selectedValue) {
      this.router.navigate([`/admin/${selectedValue}`]);
    }
  }

  showLogoutAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to log out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red color for logout
      cancelButtonColor: '#3085d6', // Blue color for cancel
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
        this.router.navigate([`/login`]);
      }
    });
  }
}