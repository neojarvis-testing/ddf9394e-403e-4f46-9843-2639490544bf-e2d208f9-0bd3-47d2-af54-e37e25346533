import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  public  apiUrl = 'https://8080-aceeabeedebaecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/api/feedback';

  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });
  }

  sendFeedback(feedback: Feedback):Observable<Feedback>{
    return this.http.post<Feedback>(`${this.apiUrl}`,feedback, {
      headers: this.getAuthHeaders()
    });
  }

  getAllFeedbacksByUserid(userId: number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}/user/${userId}`,{
      headers: this.getAuthHeaders()
    });
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}`,{
      headers: this.getAuthHeaders()
    });
  }

  deleteFeedback(feedbackId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${feedbackId}`,{
      headers: this.getAuthHeaders()
    });
  }
}
