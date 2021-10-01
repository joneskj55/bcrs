/*
============================================
; Title:  invoice.interface.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 1 Oct 2021
; Description: Interface for Invoice object
;===========================================
*/

import { LineItem } from './line-item.interface';

// Interface for Invoice object
export class Invoice {
  private username: string;
  private lineItems: LineItem[];
  private orderDate: string;
  private LABOR_RATE: number = 50;

  partsAmount: number;
  laborHours: number;

  constructor(username?: string, partsAmount?: number, laborHours?: number) {
    this.username = username || '';
    this.partsAmount = partsAmount || 0;
    this.laborHours = laborHours || 0;
    this.orderDate = new Date().toLocaleDateString();
    this.lineItems = [];
  }

  // getters and setters
  getUsername(): string {
    return this.username;
  }

  setLineItems(lineItems: LineItem[]): void {
    this.lineItems = lineItems;
  }

  getLineItems(): LineItem[] {
    return this.lineItems;
  }

  getLineItemTotal(): number {
    let total = 0;
    for (let lineItem of this.lineItems) {
      total += lineItem.price;
    }
    return Number(total);
  }

  getLaborAmount(): number {
    return Number(this.laborHours) * Number(this.LABOR_RATE);
  }

  getOrderDate(): string {
    return this.orderDate;
  }

  getTotal(): number {
    return (
      Number(this.partsAmount) +
      Number(this.getLaborAmount()) +
      Number(this.getLineItemTotal())
    );
  }

  // clear the invoice
  clear() {
    this.partsAmount = 0;
    this.laborHours = 0;
    this.lineItems = [];
  }
}
