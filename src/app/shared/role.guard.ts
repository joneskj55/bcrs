/*
============================================
; Title:  role.guard.ts
; Author: Professor Krasso
; Modified by: Fred Marble
; Date: 2 October 2021
; Description: Role Guard file
;===========================================
*/

import { RoleService } from './services/role.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private cookieService: CookieService,
    private roleService: RoleService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.roleService
      .findUserRole(this.cookieService.get('session_user'))
      .pipe(
        map((res) => {
          console.log(res.data.role);
          if (res['data'].role === 'admin') {
            return true;
          } else {
            this.router.navigate(['/']);
            return false;
          }
        })
      );
  }
}
