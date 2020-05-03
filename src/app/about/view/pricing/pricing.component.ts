import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  @Input() pricing:Array<{
    title:string;
    price:number;
    services:Array<string>;
  }>
  constructor() { }

  ngOnInit() {
  }

}
