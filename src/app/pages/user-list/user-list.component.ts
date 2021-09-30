/*
============================================
; Title:  user-list.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 17 Sep 2021
; Description: User list component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { DeleteRecordDialogComponent } from './../../shared/delete-record-dialog/delete-record-dialog.component';
import { UserService } from './../../shared/services/user.service';
import { User } from './../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[];
  displayedColumns = [
    'userName',
    'firstName',
    'lastName',
    'phoneNumber',
    'address',
    'email',
    'functions',
  ];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private userService: UserService
  ) {
    // find all users
    this.userService.findAllUsers().subscribe(
      // subscribe to the response
      (res) => {
        // set the users to the response
        this.users = res['data'];
        console.log(this.users); // log the users
      },
      // if there is an error
      (err) => {
        console.log(err); // log the error
      }
    );
  }

  ngOnInit(): void {}

  // get the user by id and open the delete dialog
  delete(userId: string, recordId: string): void {
    const dialogRef = this.dialog.open(DeleteRecordDialogComponent, {
      data: {
        recordId,
        dialogHeader: 'Delete Record Dialog',
        dialogBody: `Art you sure you want to delete user ${recordId}?`,
      },
      disableClose: true,
      width: '800px',
    });

    // when the dialog is closed
    dialogRef.afterClosed().subscribe((result) => {
      // if the user clicks the yes button
      if (result === 'confirm') {
        // delete the user
        this.userService.deleteUser(userId).subscribe((res) => {
          console.log(`User delete`); // log the response
          this.users = this.users.filter((u) => u._id !== userId);
        });
      }
    });
  }
}
