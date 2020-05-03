import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { trigger, transition, style, animate, state, query, stagger, group } from '@angular/animations';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('* <=> *', [
        query('.col-12,:enter',[
          style({opacity:'0'}),
          animate("500ms 100ms cubic-bezier(.17,.67,.88,.1)",style({opacity:'1'}))
        ]),
      ])
    ])
  ]
})
export class LoginModalComponent implements AfterViewInit{

  isLoginPageFlag:boolean = true;
  animationState = true;
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private modalPopup:NgxSmartModalService
  ) { }
  
  ngAfterViewInit(){
  }

  togglePage(){
    this.isLoginPageFlag = !this.isLoginPageFlag;
    this.animationState = this.animationState === false? true : false;
  }

  login(f:NgForm){
    this.authService.loginUser(f.value).subscribe(
      (response : any)=>{
        if(response){
          localStorage.setItem("token",response.toString())
          this.modalPopup.close('loginModal')
        }
      },
      (err)=>alert(err.error.message)
    )
  }
  signup(f:NgForm){
    this.authService.signupUser(f.value).subscribe(
      (response : any)=>{
        if(response){
          response=>this.modalPopup.close('loginModal')
        }
      },
      (err)=>alert(err.error.message)
    )
  }
  redirect(){
    this.router.navigate(['index'])
  }
}
