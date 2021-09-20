/*
============================================
; Title:  user.service.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 17 Sep 2021
; Description: User service file
;===========================================
*/

import { Injectable } from '@angular/core';
import { User } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // find all users in the database through the api
  findAllUsers(): Observable<any> {
    return this.http.get('/api/users');
  }

  // find all users by id in the database through the api
  findUserById(userId: string): Observable<any> {
    return this.http.get('/api/users/' + userId);
  }

  // create a new user
  createUser(user: User): Observable<any> {
    return this.http.post('/api/users/', {
      userName: user.userName,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  // update a user
  updateUser(userId: string, user: User): Observable<any> {
    return this.http.put('/api/users/' + userId, {
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      email: user.email,
    });
  }

  // delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete('/api/users/' + userId);
  }
}
