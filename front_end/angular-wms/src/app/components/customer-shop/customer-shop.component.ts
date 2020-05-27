import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../../product/product';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-customer-shop',
  templateUrl: './customer-shop.component.html',
  styleUrls: ['./customer-shop.component.css'],
})
@Injectable()
export class CustomerShopComponent implements OnInit {
  shopTable: string;
  price: number;
  products: Observable<Product[]>;
  productList: Product[] = [];
  customerOrderId;
  customerOrderLineId;
  totalPrice;
  productStock;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.showProductsAvailable();
    this.newCustomerOrder()
    this.calculateTotalPrice();
  }

  showProductsToBuy() {
    return this.productList;
  }

  customerOrderLine(product: Product, rowIndex: number){
    if (product.amount == 0 || product.amount == undefined){
      this.newCustomerOrderLine(product, rowIndex);
      this.calculateTotalPrice();
    }
    else{
      this.updateCustomerOrderLine(product);
      product.amountadded = 0;
      product.amountremoved = 0;
      this.calculateTotalPrice();
    }
    if (product.amount == 0){
      var btnConfirm = document.getElementById('rowId' + rowIndex);
      (<HTMLInputElement>btnConfirm).disabled = true;
    }
    this.calculateTotalPrice();
  }

  newCustomerOrderLine(product: Product, rowIndex: number){
    var btnConfirm = document.getElementById('rowId' + rowIndex);
    (<HTMLInputElement>btnConfirm).disabled = false;

    product.amount = 0;
    product.amount = product.amountadded;
    product.amountadded = 0;
    
      this.http.get('http://localhost:8082/newCustomerOrderLine/' + 
      this.customerOrderId + "/" + product.id + "/" + product.amount).subscribe(
      (customerOrderLineId: number) => {
        (product.customerOrderLineId = customerOrderLineId),
        console.log("orderLine: " + customerOrderLineId + ' is made');
      }
    )
  }

  updateCustomerOrderLine(product: Product){
    if(product.amountadded > 0){
      this.http.post("http://localhost:8082/updateCustomerOrderLine/" + 
      product.amountadded + "/" + product.customerOrderLineId,{}).subscribe(
        ()=>console.log("product updated")
      );
      product.amount += product.amountadded;
    }
    else if(product.amountremoved > 0){
      this.http.post("http://localhost:8082/removeProductItems/" + 
      product.amountremoved + "/" + product.customerOrderLineId,{}).subscribe(
        ()=>console.log("product removed")
      );
      product.amount -= product.amountremoved;
    }
  }

  showProductsAvailable() {
    console.log('show2');
    this.products = this.http.get<Product[]>(
      'http://localhost:8082/allproducts'
    );
    this.products.subscribe(
      (productList) => (this.productList = productList),
      (err) => console.error(err),
      () => console.log('observable complete')
    );
  }

  currenInOrder(product: Product) {
    if(product.amount != 0){
      return product.amount;
    }
    else{
      return "";
    }
  }

  newCustomerOrder() {
    this.http.post('http://localhost:8082/addNewCustomerOrder', 1).subscribe(
      (customerOrderId) => {
        (this.customerOrderId = customerOrderId),
          console.log(customerOrderId + ' is making an order');
      },
      (err) => console.error(err),
      () => console.log('observable complete')
    );
  }

  formattingPrice(productPrice) {
    var priceNice = '';
    priceNice = productPrice + '';
    priceNice =
      '€' +
      priceNice.substring(0, priceNice.length - 2) +
      '.' +
      priceNice.substring(
        priceNice.length - 2,
        priceNice.length
      );

    if (priceNice.length == 4){
      priceNice = priceNice.substring(0,1) + "0" + priceNice.substring(1,4);
    }

    return priceNice;
  }

  calculatePrice(product: Product){
    if(product.amount == undefined || product.amount == 0){
      return "";
    }
    var priceproduct = product.amount*product.price;
    return this.formattingPrice(priceproduct);
  }

   calculateTotalPrice(){
    console.log(this.customerOrderId);
    if(this.customerOrderId != undefined){
      this.http.get('http://localhost:8082/getTotalPrice/' + 
      this.customerOrderId).subscribe((totalPrice: number) => {
      (this.totalPrice = totalPrice), console.log(totalPrice);});
      console.log("current price: " + this.totalPrice);
    }
    else{
      this.totalPrice = "000";
    }
  }

  getTotalPrice(){
    return this.formattingPrice(this.totalPrice);
  }

  getMaxOrder(product: Product){
    if(product.amount == undefined){
      product.amount = 0;
    }
     product.inStockLeft = product.inStock - product.amount;
  }

  purchaseOrder(){
    if (this.totalPrice == 0){
      alert("You shopping cart is empty!");
    }
    else{
      this.http.post('http://localhost:8082/purchaseOrder/',this.customerOrderId).subscribe(
        () => console.log("Order is purchased"));
    }
  }
}
