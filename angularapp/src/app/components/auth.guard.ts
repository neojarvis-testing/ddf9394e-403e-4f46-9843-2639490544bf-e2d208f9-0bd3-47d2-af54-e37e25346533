import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('jwtToken');
    const role = localStorage.getItem('role');

    if (token) {
      const expectedRole = route.data['role'];
      if (role === expectedRole) {
        return true;
      } else {
        // Redirect to login if the role does not match
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      // Redirect to login if no token is found
      this.router.navigate(['/login']);
      return false;
    }
  }
}
