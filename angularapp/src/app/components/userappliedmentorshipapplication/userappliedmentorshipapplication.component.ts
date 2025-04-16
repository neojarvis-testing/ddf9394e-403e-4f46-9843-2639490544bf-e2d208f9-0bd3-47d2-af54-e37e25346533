import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userappliedmentorshipapplication',
  templateUrl: './userappliedmentorshipapplication.component.html',
  styleUrls: ['./userappliedmentorshipapplication.component.css']
})
export class UserappliedmentorshipapplicationComponent implements OnInit {
  ngOnInit(): void {
    
  }
  mentorships: any[] = [];
   searchTerm = '';
  
   popupImage: string | null = null;
  
  
  
   get filteredMentorships() {
  
    return this.mentorships.filter(m =>
  
     m.programName.toLowerCase().includes(this.searchTerm.toLowerCase())
  
    );
  
   }
  
  
  
   viewImage(imageUrl: string) {
  
    this.popupImage = imageUrl;
  
   }
  
  
  
   confirmDelete(index: number) {
  
    const confirmDelete = confirm('Are you sure you want to delete this application?');
  
    if (confirmDelete) {
  
     this.mentorships.splice(index, 1);
  
    }
  
   }
  
  }
  
  
  
  