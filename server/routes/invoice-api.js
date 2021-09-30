/*==========================
; Title: Invoices API
; Date: 30 September 2021
; Author: Tony Henderson
; Description: API for invoice routes.
==========================*/

const express = require('express');
const Invoice = require('../models/invoice');
const BaseResponse = require('../services/base-response');
const ErrorResponse = require('../services/error-response');

const router = express.Router();

router.post('/:userName', ( req, res ) => {

  try {
    const newInvoice = {
      userName: req.params.userName,
      lineItems: req.body.lineItems,
      partsAmount: req.body.partsAmount,
      laborAmount: req.body.laborAmount,
      lineItemTotal: req.body.lineItemTotal,
      total: req.body.total
    }

    Invoice.create(newInvoice, function( err, invoice ) {
      // Server Error
      if (err) {
        // Send 500 ErrorResponse
        const MongoErrorResponse = new ErrorResponse("500", "Internal Server Error", err);
        res.status(500).send(MongoErrorResponse.toObject());
      }
      // Query went through
      else {
        console.log(invoice);

        //Send back created invoice
        const createdInvoiceResponse = new BaseResponse("201", "Invoice Created", invoice);
        res.status(201).send(createdInvoiceResponse.toObject());
      }
    });
  }
  catch(e) {
    console.log(e)
    // Send 500 ErrorResponse
    const createInvoiceCatchErrorResponse = new ErrorResponse("500", "Internal Server Error", e.message);
    res.status(500).send(createInvoiceCatchErrorResponse.toObject());
  }

});

module.exports = router;
