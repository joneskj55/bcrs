/*
============================================
; Title:  Invoice Summary class
; Author: Tony Henderson
; Date: 3 Oct 2021
; Description: Class file for the invoice summary dialog
;===========================================
*/

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LineItem } from '../interfaces/line-item.interface';
import { PrintInvoiceDialogComponent } from '../print-invoice-dialog/print-invoice-dialog.component';

@Component({
  selector: 'app-invoice-dialog',
  templateUrl: './invoice-dialog.component.html',
  styleUrls: ['./invoice-dialog.component.css']
})
export class InvoiceDialogComponent implements OnInit {

  partsAmount: number;
  laborAmount: number;
  date: string;

  displayedColumns: Array<string> = ['name', 'price']

  lineItems : Array<LineItem>;

  total: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data,
    private matDialogRef: MatDialogRef<InvoiceDialogComponent>,
    private dialog: MatDialog
  ) {
    console.log('-- Inside dialog component --');
    console.log(data);

    this.partsAmount = data.partsAmount;
    this.laborAmount = data.getLaborAmount();

    this.date = data.getOrderDate();

    this.lineItems = data.getLineItems();

    this.total = data.getTotal();
  }

  ngOnInit(): void {
  }

  // back() {
  //   this.matDialogRef.close();
  // }

  printInvoice() {
    const dialogRef = this.dialog.open(PrintInvoiceDialogComponent, {
      width: '280px',
      disableClose: true
    });
  }

}
