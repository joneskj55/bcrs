/*
============================================
; Title:  role-create.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 30 Sep 2021
; Description: Role create component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api/message';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-create',
  templateUrl: './role-create.component.html',
  styleUrls: ['./role-create.component.css'],
})
export class RoleCreateComponent implements OnInit {
  form: FormGroup;
  errorMessages: Message[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {}

  // build the form and add validators
  ngOnInit() {
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  // create a new role
  create() {
    // get the form values
    const newRole = {
      text: this.form.controls['text'].value,
    } as Role;

    // call the service to create the role
    this.roleService.createRole(newRole).subscribe(
      // if successful, navigate to the roles page
      (res) => {
        this.router.navigate(['/roles']);
      },
      // if there is an error, display the error message
      (err) => {
        console.log(err); // log the error to the console
        // set the error message through PrimeNG
        this.errorMessages = [
          { severity: 'error', summary: 'Error', detail: err.message },
        ];
      }
    );
  }

  // cancel and navigate back to the roles page
  cancel() {
    this.router.navigate(['/roles']);
  }
}
