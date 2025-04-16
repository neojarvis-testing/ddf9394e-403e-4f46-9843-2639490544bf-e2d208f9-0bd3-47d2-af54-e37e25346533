import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 constructor(private authService:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.authService.isLoggedIn())
      {
        this.router.navigate(['/login']);
        return false;
      }
      else if(this.authService.isAdmin() || this.authService.isUser()){
        return true;
      }
      else{
        if(state.url.includes('admin')){
          this.router.navigate(['/error']);
          return false;
        }
        return true;
      }
     
  }
 
}



 
 