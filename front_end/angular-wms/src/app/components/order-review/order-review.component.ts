import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { promise } from 'protractor';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrls: ['./order-review.component.css']
})
export class OrderReviewComponent implements OnInit {


  constructor(private http: HttpClient) { }
  order: string;
  orderNiceLooking: string[] = [];
  i: number = 0;

  ngOnInit(): void {
    this.orderReview();
  }

orderReview(){
  // this.http.get('http://localhost:8082/getAllCustomerOrdersLinesString/' + 
  //     305, {responseType: 'text'}).subscribe(order => this.order = order);
  // `asynch result: ${this.orderNice()}`;

  const promise = this.http.get('http://localhost:8082/getAllCustomerOrdersLinesString/' + 305).toPromise();
  //promise.then(order => this.order = order)

}

orderNice(){
  console.log(this.orderNice);
  if(this.order != undefined){
    this.orderNiceLooking = this.order.split(",");
    console.log(this.orderNiceLooking);
    }
  }
}
