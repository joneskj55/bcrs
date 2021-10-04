/*
============================================
; Title:  user.interface.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 17 Sep 2021
; Description: Interface for User object
;===========================================
*/

import { Role } from './../interfaces/role.interface';

export interface User {
  _id?: string;
  userName?: string;
  password?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  role?: Role;
}
