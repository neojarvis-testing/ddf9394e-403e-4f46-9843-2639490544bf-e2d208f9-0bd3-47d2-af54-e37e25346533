import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MentorshipProgram } from '../models/mentorshipprogram.model';
import { MentorshipApplication } from '../models/mentorshipapplication.model';
 
@Injectable({
  providedIn: 'root',
})
export class MentorshipService {
 
  private apiUrl = 'https://ide-aeeaedafcfecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';

//  private apiUrl = 'https://ide-febfccefedaadecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';
 
  //private apiUrl = 'https://ide-cdedfabbeefdaaecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  constructor(private http: HttpClient) {}
 
  getAllMentorshipPrograms(): Observable<MentorshipProgram[]> {
    return this.http.get<MentorshipProgram[]>(`${this.apiUrl}api/mentorship-program`, {
      // headers: this.headers,
     headers: this.getAuthHeaders()
    });
  }
 
  deleteMentorshipProgram(mentorshipProgramId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/mentorship-program/${mentorshipProgramId}`, {
      headers: this.getAuthHeaders()
    });
  }
 
  getMentorshipProgramById(id: number): Observable<MentorshipProgram> {
    return this.http.get<MentorshipProgram>(`${this.apiUrl}api/mentorship-program/${id}`, {
      headers: this.getAuthHeaders()
    });
  }
 
  addMentorshipProgram(requestObject: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.post<MentorshipProgram>(`${this.apiUrl}api/mentorship-program`, requestObject, {
      headers: this.getAuthHeaders()
    });
  }
 
  updateMentorshipProgram(id: number, requestObject: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.put<MentorshipProgram>(`${this.apiUrl}api/mentorship-program/${id}`, requestObject, {
      headers: this.getAuthHeaders()
    });
  }
 
  getAppliedMentorshipPrograms(userId: number): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.apiUrl}api/mentorship-application/user/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }
 
  deleteMentorshipApplication(mentorshipApplicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}api/mentorship-application/${mentorshipApplicationId}`, {
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }
 
  addMentorshipApplication(data: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.post<MentorshipApplication>(`${this.apiUrl}api/mentorship-application`, data, {

      headers: this.getAuthHeaders(),

      responseType: 'text' as 'json'
    });
  }
 
  getAllMentorshipApplications(): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.apiUrl}api/mentorship-application`, {
      headers: this.getAuthHeaders()
    });
  }
 
  updateApplicationStatus(id: number, mentorshipApplication: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.put<MentorshipApplication>(
      `${this.apiUrl}api/mentorship-application/${id}`,
      mentorshipApplication,
      { headers: this.getAuthHeaders(),
        responseType: 'text' as 'json' }
    );
  }
 
}