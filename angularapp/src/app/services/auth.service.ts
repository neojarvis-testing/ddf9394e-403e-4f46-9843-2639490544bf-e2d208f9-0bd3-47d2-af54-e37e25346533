import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = 'https://ide-febfccefedaadecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/api';
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  private userIdSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false); 

  userRole$ = this.userRoleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  register(newUser: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/register`, newUser).pipe(
      catchError(this.handleError<User>('register'))
    );
  }

  login(loginUser: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, loginUser).pipe(
      tap(response => {
        this.storeUserData(response);
        this.updateAuthenticationStatus(true);
      }),
      catchError(this.handleError<any>('login'))
    );
  }

  logout(): void {
    localStorage.clear();
    this.updateAuthenticationStatus(false);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'Admin';
  }

  isOrganizer(): boolean {
    return localStorage.getItem('role') === 'User';
  }

  updateAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated); // Use the initialized subject
  }

  private storeUserData(user: any): void {
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
  }

  private handleError<T>(operation = 'operation', result?: T): (error: any) => Observable<T> {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
