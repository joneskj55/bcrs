/*
============================================
; Title:  base-layout.component.ts
; Author: Professor Krasso
; Date: 17 Sep 2021
; Description: Base layout component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css'],
})
export class BaseLayoutComponent implements OnInit {
  year: number = Date.now();

  constructor() {}

  ngOnInit(): void {}
}
