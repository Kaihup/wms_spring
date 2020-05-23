import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
/* INFO: https://scotch.io/courses/build-your-first-angular-website/creating-an-angular-header-and-footer */
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBootstrapModule } from './app-bootstrap.module';

/* ngx Bootstrap modules */

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent], // Eigen werk
  imports: [
    BrowserModule,
    AppBootstrapModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ], // Library modules
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
