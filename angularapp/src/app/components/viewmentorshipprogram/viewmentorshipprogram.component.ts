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
  programIdToDelete: number | null = null;
  showModal: boolean = false;

  constructor(private router: Router, private mentService: MentorshipService) { }

  ngOnInit(): void {
    this.getMentorshipPrograms();
  }

  getMentorshipPrograms() {
    console.log('In');
    this.mentService.getAllMentorshipPrograms().subscribe(data => {
      this.programs = data;
      this.filterPrograms = data; // Initialize filterPrograms with all programs
    });
  }

  search() {
    if (this.searchProgram.trim() === '') {
      this.filterPrograms = this.programs;
    } else {
      this.filterPrograms = this.programs.filter(p => 
        p.ProgramName.toLowerCase().includes(this.searchProgram.toLowerCase()) || 
        p.MentorName.toLowerCase().includes(this.searchProgram.toLowerCase())
      );
    }
  }

  editProgram(id: number): void {
    this.router.navigate([`/admin/editmentorshipprogram/${id}`]);
  }

  openConfirmationModal(id: number): void {
    this.programIdToDelete = id;
    this.showModal = true;
  }

  closeConfirmationModal(): void {
    this.showModal = false;
    this.programIdToDelete = null;
  }

  confirmDelete(): void {
    if (this.programIdToDelete !== null) {
      this.mentService.deleteMentorshipProgram(this.programIdToDelete).subscribe(() => {
        this.getMentorshipPrograms(); // Refresh the list after deletion
        this.closeConfirmationModal();
      });
    }
  }
}
