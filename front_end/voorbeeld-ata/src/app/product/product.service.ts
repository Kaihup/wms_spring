import { Injectable } from '@angular/core';
import { Product } from './product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProductService {
  jojo(): Observable<Product> {
    console.log('in productService jojo');
    return this.http.get<Product>('http://localhost:8082/allproducts');
  }
  constructor(private http: HttpClient) {}
}
