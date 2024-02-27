import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, ActivationEnd, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})

class PermissionServive {
  constructor(private router: Router, private authServie: AuthService) { }

  canActive(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authServie.isAuthenticated().then((authenticated: boolean) => {
      if (authenticated) {
        return true;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionServive).canActive(next, state);
}

export const AuthGuardChild : CanActivateChildFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean => {
  return inject(PermissionServive).canActive(next, state);
}
