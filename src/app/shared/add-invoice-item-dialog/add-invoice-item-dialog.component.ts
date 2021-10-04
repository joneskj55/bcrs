/*
============================================
; Title:  Add Invoice dialog class
; Author: Tony Henderson
; Date: 3 Oct 2021
; Description: Class for add invoice dialog component
;===========================================
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Invoice } from '../interfaces/invoice.interface';

@Component({
  selector: 'app-add-invoice-item-dialog',
  templateUrl: './add-invoice-item-dialog.component.html',
  styleUrls: ['./add-invoice-item-dialog.component.css']
})
export class AddInvoiceItemDialogComponent implements OnInit {

  addItemForm: FormGroup;
  service;


  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddInvoiceItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) { }

  ngOnInit(): void {
    this.addItemForm = this.fb.group({
      name: [null, Validators.compose([Validators.required])],
      hours: [null, Validators.compose([Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])],
      parts: [null, Validators.compose([Validators.required, Validators.pattern('[+-]?([0-9]*[.])?[0-9]+')])]
    })
  }

  createService() {
    const HOURLY_RATE = 50;
    const formValue = this.addItemForm.value;

    const hourlyTotal = formValue.hours * HOURLY_RATE;


    // Construct item from
    this.service = {
      title: formValue.name,
      parts: formValue.parts,
      hours: formValue.hours,
      price: Number(hourlyTotal) + Number(formValue.parts)
    }

    // Close dialog, passing user item
    this.matDialogRef.close(this.service);
  }

  /**
   * Closes current dialog
   */
  cancelDialog() {
    this.matDialogRef.close()
  }
}
