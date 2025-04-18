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

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter((program) =>
      program.ProgramName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.MentorName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noRecordsFound = this.filteredPrograms.length === 0;
  }

  apply(program: any, id: number): void {
    if (!program.applied) {
      this.router.navigate([`user/mentorshipapplicationform/${id}`], { state: { program } });
      program.applied = true;
      localStorage.setItem(`applied_${program.ProgramName}`, 'true');
    }
  }

  ngOnInit(): void {
    this.fetchMentorshipPrograms();
  }

  fetchMentorshipPrograms(): void {
    this.mentorshipService.getAllMentorshipPrograms().subscribe(
      (programs: any[]) => {
        this.mentorshipPrograms = programs.map(program => {
          program.applied = localStorage.getItem(`applied_${program.ProgramName}`) === 'true';
          return program;
        });
        this.filteredPrograms = [...this.mentorshipPrograms];
        this.noRecordsFound = this.filteredPrograms.length === 0;
      },
      (error) => {
        console.error('Error fetching programs:', error);
        this.noRecordsFound = true;
      }
    );
  }
}
