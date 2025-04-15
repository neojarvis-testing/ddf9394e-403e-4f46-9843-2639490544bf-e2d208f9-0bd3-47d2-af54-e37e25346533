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
  mentorshipPrograms: any[] = [];
  filteredPrograms: any[] = [];
  noRecordsFound: boolean = false;

  constructor(private mentorshipService: MentorshipService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchMentorshipPrograms();
  }

  fetchMentorshipPrograms(): void {
    this.mentorshipService.getAllMentorshipPrograms().subscribe((programs: any[]) => {
      this.mentorshipPrograms = programs;
      this.filteredPrograms = programs;
      this.noRecordsFound = programs.length === 0;
    });
  }

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter(program =>
      program.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.mentor.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noRecordsFound = this.filteredPrograms.length === 0;
  }

  apply(program: any): void {
    this.router.navigate(['/mentorshipapplicationform'], { state: { program } });
  }
}
