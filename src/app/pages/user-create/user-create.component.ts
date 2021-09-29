/*
============================================
; Title:  user-create.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 17 Sep 2021
; Description: Create user component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../shared/interfaces/user.interface';
import { UserService } from './../../shared/services/user.service';
import { Message } from 'primeng/api/message';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: any;
  errorMessages: Message[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // create form with validators
    this.form = this.fb.group({
      userName: [null, Validators.compose([Validators.required])],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
        ]),
      ],
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  // create user
  createUser(): void {
    const newUser: User = {
      userName: this.form.controls.userName.value,
      password: this.form.controls.password.value,
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
    };

    // call service to create user
    this.userService.createUser(newUser).subscribe(
      // if successful, redirect to user list
      (res) => {
        this.router.navigate(['/users']);
      },
      // if error, display error message
      (err) => {
        console.log(err);
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err['message'] },
        ];
      }
    );
  }

  // close form and go back to user list
  cancel(): void {
    this.router.navigate(['/users']);
  }
}
