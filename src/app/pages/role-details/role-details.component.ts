/*
============================================
; Title:  role-details.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 1 Oct 2021
; Description: Role details component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../shared/services/role.service';
import { Role } from '../../shared/interfaces/role.interface';

@Component({
  selector: 'app-role-details',
  templateUrl: './role-details.component.html',
  styleUrls: ['./role-details.component.css'],
})
export class RoleDetailsComponent implements OnInit {
  form: FormGroup;
  role: Role;
  roleId: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private roleService: RoleService
  ) {
    // Get the role id from the route
    this.roleId = this.route.snapshot.paramMap.get('roleId');

    // Get the role from the role service
    this.roleService.findRoleById(this.roleId).subscribe(
      // If successful, set the role
      (res) => {
        this.role = res['data'];
      },
      // If error, log the error
      (err) => {
        console.log(err);
      },
      // After both, set the form values
      () => {
        this.form.controls['text'].setValue(this.role.text);
      }
    );
  }

  ngOnInit() {
    // Build the form
    this.form = this.fb.group({
      text: [null, Validators.compose([Validators.required])],
    });
  }

  save() {
    // Get the values from the form
    const updatedRole = {
      text: this.form.controls['text'].value,
    } as Role;

    // Update the role
    this.roleService.updateRole(this.roleId, updatedRole).subscribe(
      // If successful, navigate to the roles page
      (res) => {
        this.router.navigate(['/roles']);
      },
      // If error, log the error
      (err) => {
        console.log(err);
      }
    );
  }

  cancel() {
    // Navigate to the roles page
    this.router.navigate(['/roles']);
  }
}
