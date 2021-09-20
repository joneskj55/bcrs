/*========================
; Title: Session Service
; Date: 19 September 2021
; Author: George Henderson
; Description: Services regarding user's session.
========================*/

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router, private cookieService: CookieService) { }

  /**
   * Deletes all users cookies, and sends them to the sign in page.
   */
  signOut() {
    this.cookieService.deleteAll();
    this.router.navigate(['/session/signin']);
  }
}
