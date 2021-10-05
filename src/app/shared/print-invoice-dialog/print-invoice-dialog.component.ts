import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-invoice-dialog',
  templateUrl: './print-invoice-dialog.component.html',
  styleUrls: ['./print-invoice-dialog.component.css']
})
export class PrintInvoiceDialogComponent implements OnInit {

  done: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<PrintInvoiceDialogComponent>
  ) { }

  ngOnInit(): void {
     setTimeout( () => {
       this.done = true;
         setTimeout( () => {
           this.close();
         }, 750)
     }, 2000)
  }

  close() {
    this.dialogRef.close();
  }
}
