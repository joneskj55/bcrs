/*
============================================
; Title:  user-details.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 17 Sep 2021
; Description: Sign-in component file
;===========================================
*/

import { Role } from './../../shared/interfaces/role.interface';
import { RoleService } from './../../shared/services/role.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  userId: string;
  form: FormGroup;
  roles: Role[];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private roleService: RoleService
  ) {
    // Get the user id from the url
    this.userId = this.route.snapshot.paramMap.get('userId');

    // Get the user from the user service
    this.userService.findUserById(this.userId).subscribe(
      // Success
      (res) => {
        // Assign the user to the user property
        this.user = res['data'];
      },
      // Error
      (err) => {
        console.log(err); // Log the error
      },
      () => {
        this.form.controls.firstName.setValue(this.user.firstName);
        this.form.controls.lastName.setValue(this.user.lastName);
        this.form.controls.phoneNumber.setValue(this.user.phoneNumber);
        this.form.controls.address.setValue(this.user.address);
        this.form.controls.email.setValue(this.user.email);
        this.form.controls.role.setValue(this.user.role['role']);

        console.log(this.user);

        this.roleService.findAllRoles().subscribe((res) => {
          this.roles = res.data;
        });
      }
    );
  }

  ngOnInit(): void {
    // Create the form with validators
    this.form = this.fb.group({
      firstName: [null, Validators.compose([Validators.required])],
      lastName: [null, Validators.compose([Validators.required])],
      phoneNumber: [null, Validators.compose([Validators.required])],
      address: [null, Validators.compose([Validators.required])],
      email: [
        null,
        Validators.compose([Validators.required, Validators.email]),
      ],
      role: [null, Validators.compose([Validators.required])],
    });
  }

  saveUser(): void {
    // Get the form values
    const updatedUser: User = {
      firstName: this.form.controls.firstName.value,
      lastName: this.form.controls.lastName.value,
      phoneNumber: this.form.controls.phoneNumber.value,
      address: this.form.controls.address.value,
      email: this.form.controls.email.value,
      role: this.form.controls.role.value,
    };

    // Update the user
    this.userService.updateUser(this.userId, updatedUser).subscribe(
      // Success
      (res) => {
        // Redirect to the users page
        this.router.navigate(['/users']);
      },
      // Error
      (err) => {
        console.log(err); // Log the error
      }
    );
  }

  // Cancel the update
  cancel(): void {
    this.router.navigate(['/users']);
  }
}
