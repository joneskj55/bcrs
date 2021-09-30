/*=============================
; Title: Invoice Model
; Date: 30 September 2021
; Author: Tony Henderson
; Description: Exports a model for an Invoice.
=============================*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lineItemDocument = require('../schemas/line-item');

const invoiceSchema = new Schema({
  userName: {type: String},
  lineItems: [lineItemDocument],
  partsAmount: {type: Number},
  laborAmount: { type: Number },
  lineItemTotal: { type: Number },
  total: { type: Number },
  orderDate: { type: Date, default: new Date() }
});

module.exports = mongoose.model('Invoice', invoiceSchema);
