import { Injectable } from '@angular/core';
// import { Navbar } from './navbar';
// import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class NavbarService {
  constructor(private http: HttpClient) {}
}
