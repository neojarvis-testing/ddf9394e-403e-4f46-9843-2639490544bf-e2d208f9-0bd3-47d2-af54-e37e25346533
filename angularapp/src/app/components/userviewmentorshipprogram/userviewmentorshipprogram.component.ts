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

  // ngOnInit(): void {
  //   this.fetchMentorshipPrograms();
  // }

  // fetchMentorshipPrograms(): void {
  //   this.mentorshipService.getAllMentorshipPrograms().subscribe(
  //     (programs: any[]) => {
  //       console.log('Fetched programs:', programs); // Log API response
  //       this.mentorshipPrograms = programs;
  //       this.filteredPrograms = programs;
  //       this.noRecordsFound = programs.length === 0;
  //     },
  //     (error) => {
  //       console.error('Error fetching programs:', error); // Log errors
  //     }
  //   );
  // }

  filterPrograms() {
    this.filteredPrograms = this.mentorshipPrograms.filter((program) =>
      program.ProgramName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      program.MentorName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.noRecordsFound = this.filteredPrograms.length === 0;
  }

  // apply(program: any): void {
  //   program.applied = true;
  //   this.router.navigate(['user/mentorshipapplicationform'], { state: { program } });
  // }

  apply(program: any): void {
    program.applied = true;
   
    // Save applied program in local storage
    localStorage.setItem(`applied_${program.ProgramName}`, 'true');
   
    this.router.navigate(['user/apply/:programId'], { state: { program } });
  }
   
  // Restore applied state on load
  // ngOnInit(): void {
  //   this.fetchMentorshipPrograms();
  //   this.mentorshipPrograms.forEach(program => {
  //     program.applied = localStorage.getItem(`applied_${program.ProgramName}`) === 'true';
  //   });
  // }

  ngOnInit(): void {
    this.fetchMentorshipPrograms();
  }
   
  // Modify fetchMentorshipPrograms to ensure applied programs are restored
  fetchMentorshipPrograms(): void {
    this.mentorshipService.getAllMentorshipPrograms().subscribe(
      (programs: any[]) => {
        this.mentorshipPrograms = programs.map(program => {
          program.applied = localStorage.getItem(`applied_${program.ProgramName}`) === 'true';
          return program;
        });
        this.filteredPrograms = [...this.mentorshipPrograms]; // Ensure filtering works
        this.noRecordsFound = this.filteredPrograms.length === 0;
      },
      (error) => {
        console.error('Error fetching programs:', error);
        this.noRecordsFound = true;
      }
    );
  }
}