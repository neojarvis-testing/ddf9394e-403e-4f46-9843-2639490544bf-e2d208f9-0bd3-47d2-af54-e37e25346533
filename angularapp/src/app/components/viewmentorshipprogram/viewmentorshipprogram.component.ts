import { Component, OnInit } from '@angular/core';
import { MentorshipService } from 'src/app/services/mentorship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewmentorshipprogram',
  templateUrl: './viewmentorshipprogram.component.html',
  styleUrls: ['./viewmentorshipprogram.component.css']
})
export class ViewmentorshipprogramComponent implements OnInit {

  programs: any[] = [];
  filterPrograms: any[] = [];
  searchProgram: string = '';
  programId: number;

  constructor(private router: Router, private mentService: MentorshipService) { }

  ngOnInit(): void {
    this.getMentorshipPrograms();
  }

  getMentorshipPrograms() {
    this.mentService.getAllMentorshipPrograms().subscribe(data => {
      this.programs = data;
    });
  }

  search() {
    this.filterPrograms = this.programs.filter(p => p.ProgramName.toLowerCase().includes(this.searchProgram.toLowerCase()) ||  
                                                p.MentorName.toLowerCase().includes(this.searchProgram.toLowerCase()));
  }

  editProgram(id: number): void {
    this.router.navigate([`admineditmentorshipprogram/${id}`]);
  }

  deleteProgram(id: number) {
    const confirmed = window.confirm("Are you sure you want to delete?");
    if (confirmed) {
      this.mentService.deleteMentorshipProgram(id).subscribe(() => {
        this.getMentorshipPrograms(); // Refresh the list after deletion
      });
    }
  }
}
