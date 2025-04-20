import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getAuthHeaders():HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization' : `Bearer ${token}`,
      'Content-Type' : 'application/json'
    });
  }


  // sendFeedback(feedback: Feedback):Observable<Feedback>{
  //   return this.http.post<Feedback>(`${this.apiUrl}api/Feedback`,feedback, {
  //     headers: this.getAuthHeaders()
  //   });
  // }
  sendFeedback(feedback: Feedback, options: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}api/Feedback`, feedback, { headers, ...options });
    responseType: 'text' as 'json'
    }


  getAllFeedbacksByUserid(userId: number):Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}api/Feedback/user/${userId}`,{
      headers: this.getAuthHeaders()
    });
  }

  getFeedbacks():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.apiUrl}api/Feedback`,{
      headers: this.getAuthHeaders()
    });
  }

  deleteFeedback(feedbackId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}api/Feedback/${feedbackId}`,{
      headers: this.getAuthHeaders(),
      responseType: 'text' as 'json'
    });
  }
}
