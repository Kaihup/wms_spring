import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient}          from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../product/product';

@Component({
  selector: 'app-customer-shop',
  templateUrl: './customer-shop.component.html',
  styleUrls: ['./customer-shop.component.css']
})

@Injectable()
export class CustomerShopComponent implements OnInit {
  shopTable: string;
  products: Observable<Product[]>;
  productList: Product[] = [];
  constructor(private http: HttpClient) { }


  ngOnInit(): void {
  }

  
  showProductsToBuy(){
    console.log("show1");
    this.shopTable = "";
    this.shopTable +=
    "<table class='table img-table table-striped'><thead>" +
					"<tr><th scope='col'>Product</th>" +
					"<th scope='col'>Price</th>" +
					"<th scope='col'>Items</th>" +
          "<th scope='col'></th>" +
          "<th scope='col'>Remove from order</th>" +
          "<th scope='col'></th>" +
					"<th scope='col'>Items in current order</th>" +
					"<th scope='col'>Cost</th>" +
					"<th scope='col'>Height</th>" +
					"</thead><tbody>";
    ;
    this.shopTable += "</tbody></table>";
    return this.shopTable
  }

  showProductsAvailable(){//: Observable<Product>{
    //this.keepreloading = false;
    console.log("show2");
    //return this.http.get<Product>("http://localhost:8082/allproducts");
    //this.products = this.http.get<Product>("http://localhost:8082/allproducts");
    this.products = this.http.get<Product[]>("http://localhost:8082/allproducts");
    this.products.subscribe(productList => this.productList = productList);
    //this.products.subscribe((training) => console.log(training));
    //this.products.subscribe((productlist => this.myGridO;
    //return this.products;
  }
  

 
}


