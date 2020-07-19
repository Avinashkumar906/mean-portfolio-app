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
      // focus code
    }else{
      // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.services,index)){
      // focus code
    }else{
      // focus code
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
