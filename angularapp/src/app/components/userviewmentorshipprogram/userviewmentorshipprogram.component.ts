import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userviewmentorshipprogram',
  templateUrl: './userviewmentorshipprogram.component.html',
  styleUrls: ['./userviewmentorshipprogram.component.css']
})
export class UserviewmentorshipprogramComponent implements OnInit {
  searchTerm: string = '';
  mentorshipPrograms = [
    {
      name: 'Leadership Mentorship',
      field: 'Management',
      duration: '3 Months',
      mentor: 'John Doe',
      experience: '5+ Years',
      mode: 'Online',
      description: 'A program to develop leadership skills.',
      applied: false
    },
    // Add more dummy programs as needed
  ];

  filteredPrograms = this.mentorshipPrograms;

  constructor(private mentorshipService: MentorshipService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Initialize your component here
  }

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter(program =>
      program.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.mentor.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  apply(program: any): void {
      this.router.navigate(['/mentorshipapplicationform'], { state: { program } });
    }
    
}
