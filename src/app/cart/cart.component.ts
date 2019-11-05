import { Component, OnInit } from "@angular/core";
import { ProductsService } from "../DAL/products.service";
import { ActivatedRoute } from "@angular/router";
import { CartService } from "../Service/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  items;

  categories: any;
  products: any;
  cid: number;
  id: number;
  product: any;
  discount: 30;
  realPrice;
  // price: number;
  // quantity: number;

  // array = [
  // this.price= this.product.price,
  //   this.quantity= 1
  // ]

  constructor(
    private productsservice: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productsservice.getAllCategories().subscribe(data => {
      this.categories = data;
    });
    this.productsservice.getAllProducts().subscribe(data => {
      this.products = data;
      this.fillter();
    });

    this.items = this.cartService.getItems();
  }
  fillter() {
    this.route.paramMap.subscribe(para => {
      this.id = +para.get("id");
    });
    this.product = this.products.find(p => p.id === this.id);
    // this.features=this.product.newfeature;
    // this.array.price=this.product.price;
  }

  saving(id)
  {
    let savePrice;
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        savePrice= this.items[i].price*(this.discount);
        this.items[i].savePrice=savePrice/100
      }
    }
    return savePrice/100;
  }

  price(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        this.realPrice = this.items[i].savePrice * this.items[i].quantity;
        this.items[i].realPrice=this.realPrice;
        // this.items.push(this.realPrice)
        return this.realPrice;
      }
    }
  }
  clearCart(id) {
    for (let i = 0; i < this.items.length; i++)
    {
      if(this.items[i].id==id)
      {
        this.items.splice(i,1)
      }
    }
    return this.items;
  }
  total() {
    let s = 0;
    for (let i = 0; i < this.items.length; i++) {
      s = s + this.items[i].realPrice;
      }
      return s;
    }
  
}
