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
  price: number;
  priceNice: string;
  products: Observable<Product[]>;
  productList: Product[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showProductsAvailable();
  }

  showProductsToBuy(){
      return this.productList;
  }


  
  // showProductsToBuy(){
    // console.log("show1");
    // this.shopTable = "";
    // this.shopTable +=
    // "<table class='table img-table table-striped'><thead>" +
		// 			"<tr><th scope='col'>Product</th>" +
		// 			 "<th scope='col'>Price</th>" +
		// 			 "<th scope='col'>Items</th>" +
    //        "<th scope='col'></th>" +
    //        "<th scope='col'>Remove from order</th>" +
    //        "<th scope='col'></th>" +
		// 			 "<th scope='col'>Items in current order</th>" +
		// 			 "<th scope='col'>Cost</th>" +
		// 			"</thead><tbody>";
    // ;
    
    // for(let i =0; i < this.productList.length; i++){
    //   this.shopTable +=
    //   "</td><td class='font-weight-bold'>" +
    //    this.productList[i].name +
    //   "</td><td>" +
    //    this.productList[i].price +
    //   "</td><td>" +
    //   '<a class="btn btn-outline-success mb-3" (click)="testing()">Show</a>'+
      
    //   "</td></tr>"
    // }


    


  //   // for(let i =0; i < this.productList.length; i++){
  //   //   this.shopTable +=
  //   //   "</td><td class='font-weight-bold'>" +
  //   //    this.productList[i].name +
  //   //   "</td><td>" +
  //   //    this.productList[i].price +
  //   //   "</td><td>" +
  //   //   '<button type="button" class="btn btn-outline-secondary" (click)="AddProductToList(\'' +
  //   //    this.productList[i].id? +
  //   //   "')\" id=ipaddproducttolist>Add to</button>" +
  //   //   "</td></tr>"      ;
  //   // }

  //   this.shopTable += "</tbody></table>";
  //   return this.shopTable
  // }

  testing(product: Product){

    product.amount = product.amountadded;
    console.log(product.name);
    console.log(product.amountadded);
  }

  showProductsAvailable(){
    console.log("show2");
    this.products = this.http.get<Product[]>("http://localhost:8082/allproducts");
    this.products.subscribe(productList => this.productList = productList,
      (err) => console.error(err), () => console.log("observable complete"));
  }

  currenInOrder(product: Product){
    return product.amount;
  }
  
  newCustomerOrder(){
    this.http.post("http://localhost:8082/addNewCustomerOrder",10);
  }

  formattingPrice(product: Product){
    this.price = product.price;
    this.priceNice = "";
    this.priceNice = this.price + "";
    this.priceNice = "€" + this.priceNice.substring(0,this.priceNice.length-2) + "." 
      + this.priceNice.substring(this.priceNice.length-2,this.priceNice.length);
    console.log(this.priceNice);
    return this.priceNice;
  }




  // showProductsAvailable(){//: Observable<Product>{
  //   //this.keepreloading = false;
  //   console.log("show2");
  //   //return this.http.get<Product>("http://localhost:8082/allproducts");
  //   //this.products = this.http.get<Product>("http://localhost:8082/allproducts");
  //   this.products = this.http.get<Product[]>("http://localhost:8082/allproducts");
  //   this.products.subscribe(productList => this.productList = productList);
  //   //this.products.subscribe((training) => console.log(training));
  //   //this.products.subscribe((productlist => this.myGridO;
  //   //return this.products;
  // }
  

 
}


