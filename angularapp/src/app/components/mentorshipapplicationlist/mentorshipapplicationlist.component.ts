import { Component, OnInit } from '@angular/core';
import { MentorshipApplication } from 'src/app/models/mentorshipapplication.model';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { MentorshipProgram } from 'src/app/models/mentorshipprogram.model';

@Component({
  selector: 'app-mentorshipapplicationlist',
  templateUrl: './mentorshipapplicationlist.component.html',
  styleUrls: ['./mentorshipapplicationlist.component.css']
})
export class MentorshipapplicationlistComponent implements OnInit {

  constructor(private mentService: MentorshipService) { }

  applications: MentorshipApplication[] = [];
  programs: MentorshipProgram[] = [];
  programApplicationMap: { [key: string]: MentorshipApplication[] } = {};

  ngOnInit(): void {
    this.loadApplicationsAndPrograms();
  }

  loadApplicationsAndPrograms(): void {

    this.mentService.getAllMentorshipApplications().subscribe((data) => {
      this.applications = data;

      this.mentService.getAllMentorshipPrograms().subscribe((programs) => {
        this.programs = programs;
        this.groupApplicationsByProgram();

      });

    });

  }

  groupApplicationsByProgram(): void
  {
    this.programApplicationMap = {};
    this.programs.forEach(program => {
      const filteredApps = this.applications.filter(app => app.MentorshipProgramId === program.MentorshipProgramId);
      if (filteredApps.length > 0)
      {
        this.programApplicationMap[program.ProgramName] = filteredApps;
      }
    });
  }
}

