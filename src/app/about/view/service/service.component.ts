import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  @Input() services;

  constructor(
    private authService : AuthService
  ) { }

  ngOnInit() {
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
