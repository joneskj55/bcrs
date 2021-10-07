/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date: 17 Sep 2021
; Modified By: George Henderson, Kevin Jones
; Description: Base layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Role } from '../interfaces/role.interface';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();
  userRole: any;
  username: string;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private roleService: RoleService
  ) {
    // get the user role in order to control access permissions
    this.roleService
      .findUserRole(this.cookieService.get('session_user'))
      .subscribe((res) => {
        this.userRole = res['data'];
      });
  }

  // check if the user is an admin
  isAdmin(): boolean {
    return this.userRole.role === 'admin';
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('session_user');
  }

  /**
   * Deletes all users cookies, and sends them to the sign in page.
   */
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
