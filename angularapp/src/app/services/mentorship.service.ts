import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MentorshipProgram } from '../models/mentorshipprogram.model';
import { MentorshipApplication } from '../models/mentorshipapplication.model';

@Injectable({
  providedIn: 'root',
})
export class MentorshipService {
  private baseUrl = 'https://ide-febfccefedaadecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8081/';
  private authToken = `Bearer ${localStorage.getItem('authToken')}`;
  private headers = new HttpHeaders({
    Authorization: this.authToken,
  });

  constructor(private http: HttpClient) {}

  getAllMentorshipPrograms(): Observable<MentorshipProgram[]> {
    return this.http.get<MentorshipProgram[]>(`${this.baseUrl}mentorship-program`, {
      headers: this.headers,
    });
  }

  deleteMentorshipProgram(mentorshipProgramId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}mentorship-program/${mentorshipProgramId}`, {
      headers: this.headers,
    });
  }

  getMentorshipProgramById(id: number): Observable<MentorshipProgram> {
    return this.http.get<MentorshipProgram>(`${this.baseUrl}mentorship-program/${id}`, {
      headers: this.headers,
    });
  }

  addMentorshipProgram(requestObject: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.post<MentorshipProgram>(`${this.baseUrl}mentorship-program`, requestObject, {
      headers: this.headers,
    });
  }

  updateMentorshipProgram(id: number, requestObject: MentorshipProgram): Observable<MentorshipProgram> {
    return this.http.put<MentorshipProgram>(`${this.baseUrl}mentorship-program/${id}`, requestObject, {
      headers: this.headers,
    });
  }

  getAppliedMentorshipPrograms(userId: number): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.baseUrl}mentorship-application/user/${userId}`, {
      headers: this.headers,
    });
  }

  deleteMentorshipApplication(mentorshipApplicationId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}mentorship-application/${mentorshipApplicationId}`, {
      headers: this.headers,
    });
  }

  addMentorshipApplication(data: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.post<MentorshipApplication>(`${this.baseUrl}mentorship-application`, data, {
      headers: this.headers,
    });
  }

  getAllMentorshipApplications(): Observable<MentorshipApplication[]> {
    return this.http.get<MentorshipApplication[]>(`${this.baseUrl}mentorship-application`, {
      headers: this.headers,
    });
  }

  updateApplicationStatus(id: number, mentorshipApplication: MentorshipApplication): Observable<MentorshipApplication> {
    return this.http.put<MentorshipApplication>(
      `${this.baseUrl}mentorship-application/${id}`,
      mentorshipApplication,
      { headers: this.headers }
    );
  }
}