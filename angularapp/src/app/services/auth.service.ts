import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private apiUrl = environment.apiUrl;
  
  constructor(private http:HttpClient, private router:Router) { }
 
  register(user:User):Observable<any>
  {
    return this.http.post<any>(`${this.apiUrl}/api/register`,user);
  }
 
  login(login:Login):Observable<any>
  {
   
    return this.http.post(`${this.apiUrl}/api/login`,login);
  }
 
 
 
  getAllUsers(): Observable<User[]> {
   return this.http.get<User[]>(`${this.apiUrl}/api/users`);
   }
 
 
  isRole()
  {
    const token=localStorage.getItem("token").split('.');
    let payload=JSON.parse(atob(token[1]));
    localStorage.setItem('userRole',payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    localStorage.setItem('userName',payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    localStorage.setItem('userId',payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
  }
  isRoles():string
  {
    const token=localStorage.getItem("token").split('.');
    let payload=JSON.parse(atob(token[1]));
    localStorage.setItem('userRole',payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    localStorage.setItem('userName',payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
    localStorage.setItem('userId',payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    return payload;
  }
 
  isLoggedIn():boolean
  {
    if(localStorage.getItem('userRole')==="Admin" || localStorage.getItem('userRole')==="User")
    {
      return true;
    }
    return false;
  }
 
  isAdmin():boolean
  {
    return localStorage.getItem('userRole')==="Admin";
  }
 
  isUser():boolean
  {
    return localStorage.getItem('userRole')==="User";
  }
 
  logout()
  {
   
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
  }

}
 
 