import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Array<IProduct>

  constructor() {
    this.products = [
      {
        text: 'Password Reset',
        cost: 39.99
      },
      {
        text: 'Spyware Removal',
        cost: 99.99
      },
      {
        text: 'RAM Upgrade',
        cost: 129.99
      },
      {
        text: 'Software Installation',
        cost: 49.99
      },
      {
        text: 'Tune-up',
        cost: 89.99
      },
      {
        text: 'Keyboard Cleaning',
        cost: 45.00
      },
      {
        text: 'Disk Clean-up',
        cost: 149.99
      }
    ]
   }

   getProducts() : Array<IProduct> {
     return this.products;
   }
}
