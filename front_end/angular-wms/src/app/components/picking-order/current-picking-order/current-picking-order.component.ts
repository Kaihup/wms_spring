import { Component, OnInit } from '@angular/core';
import { OrderLine } from './OrderLine';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-current-picking-order',
  templateUrl: './current-picking-order.component.html',
  styleUrls: ['./current-picking-order.component.css'],
})
// @Injectable()
export class CurrentPickingOrderComponent implements OnInit {
  /* ORDER LINES */
  orderLinesTable: string;
  orderLines: Observable<OrderLine[]>;
  orderLineArray: OrderLine[] = [];

  /* ORDER  */
  orderId: number;
  orderCurrentStatus: string;
  orderStatusDate: string;
  orderStatusTime: string;
  orderTotalItems: number;

  /* CUSTOMER */
  customerId: number;
  customerFirstName: string;
  customerLastName: string;
  // customerEmail: string;
  // customerMobilePhone: string;
  // customerPhone: string;
  customerAdress: string;
  customerZipCode: string;

  activate: boolean;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getOrderLines();
  }

  setOrderDetails(orderLineArray) {
    console.log(orderLineArray);
    var order = orderLineArray[0].customerOrder;
    var customer = order.customer;

    this.orderId = order.id;
    this.orderTotalItems = this.calculateTotalItems(orderLineArray);
    this.orderCurrentStatus = order.currentStatus;
    this.orderStatusDate = order.currentStatusLocalDateTime.substring(0, 10);
    this.orderStatusTime = order.currentStatusLocalDateTime.substring(11, 19);

    this.customerId = customer.id;
    this.customerFirstName = customer.firstName;
    this.customerLastName = customer.lastName;
    // this.customerEmail = customer.email;
    // this.customerPhone = customer.phone;
    // this.customerMobilePhone = customer.mobilePhoneNumber;
    this.customerAdress = customer.phoneNumber;
    this.customerAdress = customer.streetAdress;
    this.customerZipCode = customer.zipCode;
  }

  calculateTotalItems(orderLineArray) {
    var result = 0;
    orderLineArray.forEach((element) => {
      result += element.amountOrdered;
    });
    return result;
  }

  pickItems(amountPicked, lineIndex) {
    var currentLine = this.orderLineArray[lineIndex];
    var currentAmountPicked = currentLine.amountPicked + amountPicked;
    if (currentAmountPicked >= 0) {
      currentLine.amountPicked = currentAmountPicked;
    } else {
      currentLine.amountPicked = 0;
    }
    console.log(currentLine.amountOrdered);
    console.log(currentLine.amountPicked);

    if (currentLine.amountOrdered == currentLine.amountPicked) {
      this.activate = true;
    } else {
      this.activate = false;
    }
  }

  getOrderLines() {
    this.orderLines = this.http.get<OrderLine[]>(
      'http://localhost:8082/getNextCustomerOrderToPick'
    );
    this.orderLines.subscribe(
      (orderLineArray) => (this.orderLineArray = orderLineArray),
      (err) => console.error(err),
      () => this.setOrderDetails(this.orderLineArray)
      // () => console.log(this.orderLineArray)
      // () => console.log('observable complete')
    );
  }

  // currenInOrder(product: Product) {
  //   return product.amount;
  // }

  //Hier wordt de order gemaakt, dus dat betekent na inlog dat de customerId hier naar toe gestuurd moet worden.
  // newCustomerOrder() {
  //   this.http.post('http://localhost:8082/addNewCustomerOrder', 1).subscribe(
  //     (CustomerOrderId) => {
  //       (this.CustomerOrderId = CustomerOrderId),
  //         console.log(CustomerOrderId + ' is making an order');
  //     },
  //     (err) => console.error(err),
  //     () => console.log('observable complete')
  //   );

  //   //this.http.post("http://localhost:8082/testing","10").subscribe(response => console.log(response));
  // }

  // formattingPrice(product: Product) {
  //   this.price = product.price;
  //   this.priceNice = '';
  //   this.priceNice = this.price + '';
  //   this.priceNice =
  //     '€' +
  //     this.priceNice.substring(0, this.priceNice.length - 2) +
  //     '.' +
  //     this.priceNice.substring(
  //       this.priceNice.length - 2,
  //       this.priceNice.length
  //     );
  //   return this.priceNice;
  // }
}
