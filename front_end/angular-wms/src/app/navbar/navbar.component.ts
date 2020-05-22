import { Component } from '@angular/core';
// import { Navbar } from './navbar';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'the-navbar', // dash in selector naam is gangbaar
  templateUrl: './navbar.component.html',
  providers: [NavbarService],
  // styleUrls: ['./app.component.css'],
})
export class NavbarComponent {
  constructor(private navbarService: NavbarService) {}
}
