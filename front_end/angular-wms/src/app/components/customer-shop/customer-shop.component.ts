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
  CustomerOrderId;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.showProductsAvailable();
  }

  showProductsToBuy(){
      return this.productList;
  }

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
  
  //Hier wordt de order gemaakt, dus dat betekent na inlog dat de customerId hier naar toe gestuurd moet worden.
  newCustomerOrder(){
    this.http.post("http://localhost:8082/addNewCustomerOrder",1).subscribe(CustomerOrderId => 
    {this.CustomerOrderId = CustomerOrderId, console.log(CustomerOrderId + " is making an order")},
    (err) => console.error(err), () => console.log("observable complete"));


    //this.http.post("http://localhost:8082/testing","10").subscribe(response => console.log(response));
  }

  formattingPrice(product: Product){
    this.price = product.price;
    this.priceNice = "";
    this.priceNice = this.price + "";
    this.priceNice = "€" + this.priceNice.substring(0,this.priceNice.length-2) + "." 
      + this.priceNice.substring(this.priceNice.length-2,this.priceNice.length);
    return this.priceNice;
  }
 
}


