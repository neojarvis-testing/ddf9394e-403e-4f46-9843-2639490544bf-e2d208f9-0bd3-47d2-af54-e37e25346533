import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { HttpClient } from '@angular/common/http';



@Component({

 selector: 'app-userviewmentorshipprogram',

 templateUrl: './userviewmentorshipprogram.component.html',

 styleUrls: ['./userviewmentorshipprogram.component.css']

})

export class UserviewmentorshipprogramComponent implements OnInit {



  mentorshipList: any[] = [];

  filteredList: any[] = [];

  searchTerm: string = '';

  userAppliedPrograms: number[] = [];



  constructor(private http: HttpClient) {}



  ngOnInit(): void {

    this.loadMentorshipPrograms();

  }



  loadMentorshipPrograms() {

    this.http.get<any[]>('your-api-url/mentorshipapplication').subscribe(data => {

      this.mentorshipList = data;

      this.filteredList = data;

    });

  }



  searchPrograms() {

    const term = this.searchTerm.toLowerCase();

    this.filteredList = this.mentorshipList.filter(item =>

      item.programName.toLowerCase().includes(term) ||

      item.mentorName.toLowerCase().includes(term)

    );

  }



  apply(programId: number) {

    if (!this.userAppliedPrograms.includes(programId)) {

      this.userAppliedPrograms.push(programId);

    }

  }



  isApplied(programId: number): boolean {

    return this.userAppliedPrograms.includes(programId);

  }

}

