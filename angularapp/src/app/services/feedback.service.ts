import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {



  public apiUrl = 'https://ide-febfccefedaadecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';

  //public apiUrl = 'https://ide-cdedfabbeefdaaecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';


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
      headers: this.getAuthHeaders()
    });
  }
}
