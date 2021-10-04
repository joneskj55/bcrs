/*
============================================
; Title:  purchases-by-service-graph.component.ts
; Author: Professor Krasso
; Modified by: Kevin Jones
; Date: 1 Oct 2021
; Description: Purchases by service graph component file
;===========================================
*/

import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-purchases-by-service-graph',
  templateUrl: './purchases-by-service-graph.component.html',
  styleUrls: ['./purchases-by-service-graph.component.css'],
})
export class PurchasesByServiceGraphComponent implements OnInit {
  purchases: any;
  data: any;
  itemCount = [];
  labels = [];

  constructor(private invoiceService: InvoiceService) {
    // call the purchases-graph api
    this.invoiceService.findPurchasesByServiceGraph().subscribe((res) => {
      // map the response data to the purchases variable
      this.purchases = res['data'];

      // loop over the purchases to split out the services and item count
      for (const item of this.purchases) {
        this.labels.push(item._id.title);
        this.itemCount.push(item.count);
      }

      // build the object literal for the primeNG graph
      this.data = {
        labels: this.labels,
        datasets: [
          // graph object
          {
            backgroundColor: [
              '#851a1b',
              '#8d612e',
              '#0f314d',
              '#1a3d1d',
              '#b9b2a2',
              '#231c0b',
              '#eead3d',
            ],
            hoverBackgroundColor: [
              '#851a1b',
              '#8d612e',
              '#0f314d',
              '#1a3d1d',
              '#b9b2a2',
              '#231c0b',
              '#eead3d',
            ],
            data: this.itemCount,
          },
        ],
      };
      // verify the data objects structure matches primeNG format
      console.log('Data object');
      console.log(this.data);
    });
  }

  ngOnInit(): void {}
}
