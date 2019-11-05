import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../DAL/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from "../Service/cart.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  items;
  customers;

  categories: any;
  products: any;
  cid: number;
  id: number;
  product: any;
  discount: 30;
  realPrice;
  subTotalPrice;

  tax = 70.95;
  shipping = 10;
  total;

  constructor(private productsservice:ProductsService, private route:ActivatedRoute,private cartService: CartService) { }

  ngOnInit() {
    this.productsservice.getAllCategories().subscribe(data=>{
      this.categories=data
    })
    this.fillter();
    this.items = this.cartService.getItems();
    this.customers = this.cartService.getCustomer();
  }
  fillter(){
    this.route.paramMap.subscribe(para=>{
      this.cid=+para.get('cid');
    })
    if(this.cid!=0){
      this.productsservice.getAllProducts().subscribe(data=>{
        this.products=data
        this.products=this.products.fillter(p=>{
          p.cid===this.cid
        })
      })
    }
    else{
      this.productsservice.getAllProducts().subscribe(data=>{
        this.products=data
      })
    }
  }

  yourCost()
  {
    let realPrice= (this.product.price*(100-this.discount))/100
    this.product.savePrice=realPrice
    return realPrice;
  }

  saving(id)
  {
    let savePrice;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        savePrice= this.items[i].price-(this.items[i].price*(this.discount));
        this.items[i].savePrice=this.items[i].price-(savePrice/100)
      }
    }
    return savePrice;
  }

  price(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.realPrice = this.items[i].savePrice * this.items[i].quantity;
        this.items[i].totalPrice=this.realPrice;
        return this.realPrice;
      }
    }
  }
  subTotal() {
    let s = 0;
    for (let i = 0; i < this.items.length; i++) {
      s = s + this.items[i].totalPrice;
      }
      this.subTotalPrice=s;
      return s;
  }
  Total(){
    let total= this.subTotalPrice+this.tax+this.shipping;
    return total;
  }
}