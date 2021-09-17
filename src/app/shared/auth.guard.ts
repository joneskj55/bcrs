/*==============================
; Title: Auth Guard
; Date: 17 September 2021
; Author: George Henderson
; Description: Verifies that the user is logged in,
; otherwise sends them to signin.
==============================*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const isLoggedIn = this.cookieService.get('session_user');

    if (isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(['/session/signin']);
      return false;
    }

  }

}
