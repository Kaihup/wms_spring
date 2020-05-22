import { Component } from '@angular/core';
// import { Navbar } from './navbar';
import { FootService } from './foot.service';

@Component({
  selector: 'the-footer', // dash in selector naam is gangbaar
  templateUrl: './foot.component.html',
  providers: [FootService],
  // styleUrls: ['./app.component.css'],
})
export class FootComponent {
  constructor(private footService: FootService) {}
}
