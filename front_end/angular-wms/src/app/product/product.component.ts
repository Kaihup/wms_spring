import { Component } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'het-product', // dash in selector naam is gangbaar
  templateUrl: './product.component.html',
  providers: [ProductService],
  // styleUrls: ['./app.component.css'],
})
export class ProductComponent {
  product1: Product = new Product();
  product2: Product;
  producten: Product[] = [];
  constructor(private productService: ProductService) {
    // Dependency injection --> synoniem aan @Autowired
    this.product1.naam;
    this.product1.prijs;
  }
  prijs = 0;
  naam = '';
  veranderPrijs($event) {
    console.log($event);
    this.prijs = $event.target.value;
    console.log($event);
  }

  getProducts() {
    // this.productService.jojo();
    this.productService.jojo().subscribe((training) => console.log(training));
  }

  maakProductAan() {
    let product3: Product = new Product();
    product3.naam = this.naam;
    product3.prijs = this.prijs;
    this.producten.push(product3);
  }

  vulMetProducten() {
    this.producten.push(this.product1);
  }
}
