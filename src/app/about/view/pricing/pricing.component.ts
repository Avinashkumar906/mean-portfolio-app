import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

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
  constructor(
    private authService:AuthService,
  ) { }

  ngOnInit() {
  }
  removePricing(index:number){
    this.pricing.splice(index,1)
  }
  onSubmit(form:NgForm){
    let temp:any = new Object({
      title:form.value.title,
      price:form.value.price,
      services:form.value.services.split(',')
    })
    this.pricing.push(temp)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}