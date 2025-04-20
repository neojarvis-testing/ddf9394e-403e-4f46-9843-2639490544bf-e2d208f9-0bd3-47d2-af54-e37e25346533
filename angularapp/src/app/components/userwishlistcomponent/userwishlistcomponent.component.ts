import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-userwishlistcomponent',
  templateUrl: './userwishlistcomponent.component.html',
  styleUrls: ['./userwishlistcomponent.component.css']
})
export class UserwishlistcomponentComponent implements OnInit {
  wishlistPrograms: any[] = [];
 
  constructor(private router: Router) { }
 
  ngOnInit(): void {
    this.loadWishlist();
  }
 
  loadWishlist(): void {
    const wishlist = localStorage.getItem('wishlist');
    this.wishlistPrograms = wishlist ? JSON.parse(wishlist) : [];
  }
 
  apply(program: any, id: number): void {
    this.router.navigate([`user/mentorshipapplicationform/${id}`], { state: { program } }).then(() => {
      this.removeFromWishlist(id);
    });
  }
 
  removeFromWishlist(id: number): void {
    this.wishlistPrograms = this.wishlistPrograms.filter(program => program.MentorshipProgramId !== id);
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistPrograms));
  }
}