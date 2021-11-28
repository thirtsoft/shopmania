import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild  {

  constructor(private autService: AuthService,
    private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (!this.autService.islogin) {
        this.router.navigate(['admin/signIn']);
        return false;
      } else {

        return true;
      }
    }

    canActivateChild(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean |
      Observable<boolean> | Promise<boolean> {
         return this.canActivate(route, state);
       }

}
