import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'; // Product Component

import { NavbarComponent } from './navbar/navbar.component'; // Navbar Component

import { HttpClientModule } from '@angular/common/http';
import { FootComponent } from './foot/foot.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    NavbarComponent,
    FootComponent,
  ], // Eigen werk
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], // Library modules
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
