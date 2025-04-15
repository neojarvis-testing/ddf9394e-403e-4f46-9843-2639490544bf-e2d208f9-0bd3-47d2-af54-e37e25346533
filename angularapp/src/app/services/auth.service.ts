import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl ='';

  private userRoleSubject = new BehaviorSubject<string | null>(null);
 
  private userIdSubject = new BehaviorSubject<string | null>(null);
 
  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
 
  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
   const token = localStorage.getItem('jwtToken');
   return new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
 
   });
 
  }
 
  register(user: User): Observable<any> {
   return this.http.post(`${this.apiUrl}/register`, user, {
    headers: this.getAuthHeaders()
   });
  }
 
  login(login: Login): Observable<any> {
 
   return this.http.post<any>(`${this.apiUrl}/login`, login).pipe(
 
    tap(response => {
 
     if (response && response.token) {
 
      localStorage.setItem('jwtToken', response.token);
      const payload = JSON.parse(atob(response.token.split('.')[1]));
 
      const roles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
 
      const userId = payload['nameid'];
      this.userRoleSubject.next(Array.isArray(roles) ? roles[0] : roles);
      this.userIdSubject.next(userId);
     }
    })
   );
  }
 
  logout(): void {
   localStorage.removeItem('jwtToken');
   this.userRoleSubject.next(null);
   this.userIdSubject.next(null);
  }

  isLoggedIn(): boolean {
   return !!localStorage.getItem('jwtToken');
  }
  getToken(): string | null {
   return localStorage.getItem('jwtToken');
  }
}
