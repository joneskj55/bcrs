/*========================
; Title: Sign-In Component
; Date: 16 September 2021
; Author: George Henderson
; Description: Class file for the sign-in component.
========================*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signinForm : FormGroup;
  error : string;

  constructor(private fb : FormBuilder, private cookieService: CookieService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])]
    });

  }

  signIn() {
    const userName =  this.signinForm.controls.username.value;
    const password = this.signinForm.controls.password.value;

    const user = {
      userName,
      password
    };

    try {
      this.http.post('api/session/signin', user).subscribe( res => {
        // User is authenticated
        if (res['data'].auth) {
          this.cookieService.set('session_user', res['data'].userName)
          this.router.navigate(['/']);
        }
        }, err => {
          this.error = err.error.message
        })

        }
        catch (e) {
          console.log(e.message);
          this.error = "Couldn't log you in, please try again."
        }
  }

}
