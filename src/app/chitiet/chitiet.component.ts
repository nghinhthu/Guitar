import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../DAL/products.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../Service/cart.service'


@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent implements OnInit {

  categories:any;
  products:any;
  cid:number;
  id: number;
  name: any;
  product:any;
  features:any;
  discount= 30;
  price: number;
  quantity= 1;
  // array = {
  //   quantity: 1,
  // }

  

  constructor(private productsservice:ProductsService, private route:ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.productsservice.getAllCategories().subscribe(data=>{
      this.categories=data
    });
    this.productsservice.getAllProducts().subscribe(data=>{
      this.products=data
      this.fillter();
    })
    
    // this.loadData();
  }
  fillter(){
    this.route.paramMap.subscribe(para=>{this.id=+para.get('id');
  })
    this.product=this.products.find(p=>p.id===this.id)
    this.features=this.product.newfeature;
    // this.array.price=this.product.price;
  }

  addToCart(product) {
    // window.alert('Your product has been added to the cart!');
    // this.product.push(this.quantity)
    this.cartService.addToCart(product);
    // this.product.push(this.quantity);
  }

  realPrice()
  {
    let realPrice= (this.product.price*(100-this.discount))/100
    this.product.savePrice=realPrice
    return realPrice;
  }

  savePrice()
  {
    let savePrice= this.product.price*(this.discount);
    return savePrice/100;
  }
}
