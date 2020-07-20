import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';
import { setTimeout } from 'timers';

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
    private arrayService:ArrayOperationService,
  ) { }

  ngOnInit() {
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.pricing,index)){
      let element1 = document.querySelectorAll('.pricing')[index];
      let element2 = document.querySelectorAll('.pricing')[index-1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.pricing')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.pricing,index)){
      let element1 = document.querySelectorAll('.pricing')[index];
      let element2 = document.querySelectorAll('.pricing')[index+1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.pricing')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  removePricing(index:number){
    let element1 = document.querySelectorAll('.pricing')[index];
    element1.animate({transform:['scale(1,1)','scale(.7,.7)']},{duration:250})
    setTimeout(()=>{this.pricing.splice(index,1)},250)
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
