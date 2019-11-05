import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../DAL/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../Service/cart.service'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  categories:any;
  products:any;
  cid:number;

  customer = {
    name: "",
    email: "",
    address: "",
    shipping: "" ,
  }

  constructor(private productsservice:ProductsService, private route:ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.productsservice.getAllCategories().subscribe(data=>{
      this.categories=data
    })
    this.fillter();
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
  addCustomer(customer) {
    this.cartService.addCustomer(customer);
  }
}

