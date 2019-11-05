import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../DAL/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  categories:any;
  products:any;
  cid:number;

  constructor(private productsservice:ProductsService, private route:ActivatedRoute) { }

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
}
