import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];
  
  customers = [];

  addToCart(product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart(id) {
    this.items = [];
    for (let i = 0; i < this.items.length; i++)
    {
      if(this.items[i].id==id)
      {
        this.items.splice(i,1)
      }
    }
    return this.items;
  }

  addCustomer(customer){
    this.customers.push(customer)
  }
  getCustomer() {
    return this.customers;
  }
  // getShippingPrices() {
  //   return this.http.get('/assets/db/guitar.json');
  // }

  constructor(private http: HttpClient) { }
}
