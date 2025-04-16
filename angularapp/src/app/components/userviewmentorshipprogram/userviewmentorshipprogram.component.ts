import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userviewmentorshipprogram',
  templateUrl: './userviewmentorshipprogram.component.html',
  styleUrls: ['./userviewmentorshipprogram.component.css'],
})
export class UserviewmentorshipprogramComponent implements OnInit {
  searchTerm: string = '';
  mentorshipPrograms: any[] = [];
  filteredPrograms: any[] = [];
  noRecordsFound: boolean = false;

  constructor(private mentorshipService: MentorshipService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMentorshipPrograms();
  }

  fetchMentorshipPrograms(): void {
    this.mentorshipService.getAllMentorshipPrograms().subscribe(
      (programs: any[]) => {
        console.log('Fetched programs:', programs); // Log API response
        this.mentorshipPrograms = programs;
        this.filteredPrograms = programs;
        this.noRecordsFound = programs.length === 0;
      },
      (error) => {
        console.error('Error fetching programs:', error); // Log errors
      }
    );
  }

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter((program) =>
      program.ProgramName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.MentorName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noRecordsFound = this.filteredPrograms.length === 0;
  }

  apply(program: any): void {
    this.router.navigate(['/mentorshipapplicationform'], { state: { program } });
  }
}