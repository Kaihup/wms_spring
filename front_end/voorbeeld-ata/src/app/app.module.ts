import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component'; // Product Component
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, ProductComponent], // Eigen werk
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule], // Library modules
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
