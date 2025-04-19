import { Component, OnInit } from '@angular/core';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-mentorshipapplicationlist',
  templateUrl: './mentorshipapplicationlist.component.html',
  styleUrls: ['./mentorshipapplicationlist.component.css']
})
export class MentorshipapplicationlistComponent implements OnInit {
 
  applications: MentorshipApplication[] = [];
  programs: MentorshipProgram[] = [];
  users: User[] = [];
  programApplicationMap: { [key: string]: any[] } = {};


  constructor(private mentService: MentorshipService, private router: Router, private authService: AuthService) { }


  ngOnInit(): void {
    this.loadApplicationsAndPrograms();
  }
 
  loadApplicationsAndPrograms(): void {
    this.authService.getAllUsers().subscribe((users) => {
      this.users = users;


      this.mentService.getAllMentorshipApplications().subscribe((applications) => {
        this.applications = applications;
        this.mentService.getAllMentorshipPrograms().subscribe((programs) => {
          this.programs = programs;
          this.groupApplicationsByProgram();
        });
      });
    });
  }
 
  groupApplicationsByProgram(): void {
    this.programApplicationMap = {};
    this.programs.forEach(program => {
      const filteredApps = this.applications
        .filter(app => app.MentorshipProgramId === program.MentorshipProgramId)
        .map(app => {
          const matchedUser = this.users.find(user => user.UserId === app.UserId);
          return {
            ...app,
            Username: matchedUser ? matchedUser.Username : 'Unknown User'
          };
        });


      this.programApplicationMap[program.ProgramName] = filteredApps;
    });
  }


  goBack() {
    this.router.navigate([`admin/requestedmentorshipapplication`]);
  }
}
 
 