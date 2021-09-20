/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date: 17 Sep 2021
; Modified By: George Henderson
; Description: Base layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {}

  signOut() {
    this.sessionService.signOut();
  }
}
