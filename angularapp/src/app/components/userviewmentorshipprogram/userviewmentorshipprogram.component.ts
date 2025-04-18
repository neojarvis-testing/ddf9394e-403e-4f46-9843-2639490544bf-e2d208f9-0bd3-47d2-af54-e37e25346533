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
  currentPage: number = 1;
  itemsPerPage: number = 6;
  showSearch: boolean = false;

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


  addToWishlist(program: any): void {
    let wishlist = localStorage.getItem('wishlist');
    let wishlistPrograms = wishlist ? JSON.parse(wishlist) : [];
    wishlistPrograms.push(program);
    localStorage.setItem('wishlist', JSON.stringify(wishlistPrograms));

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

  paginatedPrograms(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredPrograms.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredPrograms.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
}


