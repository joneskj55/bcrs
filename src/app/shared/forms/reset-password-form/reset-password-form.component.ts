/*
============================================
; Title:  reset-password.component.ts
; Author: Professor Krasso
; Date: 23 Sep 2021
; Modified By: Kevin Jones
; Description: Reset password component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css'],
})
export class ResetPasswordFormComponent implements OnInit {
  isAuthenticated: string;
  username: string;
  form: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService
  ) {
    this.isAuthenticated =
      this.route.snapshot.queryParamMap.get('isAuthenticated');
    this.username = this.route.snapshot.queryParamMap.get('username');
  }

  // build the form and set the validators for the password
  ngOnInit() {
    // build the form
    this.form = this.fb.group({
      // set the validators
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ]),
      ],
    });
  }

  resetPassword() {
    // get the password from the form and send it to the server to reset the password in the database
    this.http
      .post('/api/users/', +this.username + '/reset-password', {
        // @ts-ignore @GH94GitHub @marblef2 ** THIS TS-IGNORE IS TEMPORARY AND WILL NEED TO BE REMOVED **
        password: this.form.controls['password'].value,
      })
      // if the password was reset successfully, redirect to the login page
      .subscribe(
        (res) => {
          /**
           * User is authenticated and we can grant them access
           */
          this.cookieService.set('sessionuser', this.username, 1);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
