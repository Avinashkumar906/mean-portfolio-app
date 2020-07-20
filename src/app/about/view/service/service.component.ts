import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input() services;

  constructor(
    private authService : AuthService,
    private arrayService:ArrayOperationService,
  ) { }

  ngOnInit() {
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.services,index)){
      let element1 = document.querySelectorAll('.service')[index];
      let element2 = document.querySelectorAll('.service')[index-1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.service')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.services,index)){
      let element1 = document.querySelectorAll('.service')[index];
      let element2 = document.querySelectorAll('.service')[index+1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.service')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }
  removeService(index:number){
    this.services.splice(index,1)
  }
  onSubmit(form:NgForm){
    this.services.push(form.value)
    console.log(this.services)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
