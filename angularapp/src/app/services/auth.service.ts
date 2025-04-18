import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {


//   public apiUrl:string="https://ide-febfccefedaadecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/";

  //public apiUrl:string="https://ide-cdedfabbeefdaaecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/";


  //public apiUrl:string='https://ide-aeeaedafcfecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/';


   public apiUrl:string="https://ide-aceeabeedebaecdbdfcfafebbbfeedfbddafee.premiumproject.examly.io/proxy/8080/";



 
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
