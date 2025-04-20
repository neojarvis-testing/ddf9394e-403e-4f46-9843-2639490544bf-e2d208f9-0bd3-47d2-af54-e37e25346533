// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from 'src/app/services/auth.service';
 
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//  constructor(private authService:AuthService,private router:Router){}
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//       if(!this.authService.isLoggedIn())
//       {
//         this.router.navigate(['/login']);
//         return false;
//       }
//       else if(this.authService.isAdmin() || this.authService.isUser()){
//         return true;
//       }
//       else{
//         if(state.url.includes('admin')){
//           this.router.navigate(['/error']);
//           return false;
//         }
//         return true;
//       }
     
//   }
 
// }



 
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if the user is logged in
    if (this.authService.isLoggedIn()) {
      const currentUser = localStorage.getItem('userRole');
      if (!currentUser) {
        // If currentUser is null, redirect to login
        this.router.navigate(['/Login']);
        return false;
      }
 
      // Validate role-based access if roles are defined in the route
      const allowedRoles = route.data['roles'];
      if (allowedRoles && !allowedRoles.includes(currentUser)) {
        // Redirect to error page for unauthorized access
        this.router.navigate(['/error']);
        return false;
      }
      // Authorized access
      return true;
    }
    else
    {
    // Not logged in, redirect to login page
    this.router.navigate(['/Login']);
    return false;
    }
  }
}