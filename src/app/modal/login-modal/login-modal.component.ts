import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { trigger, transition, style, animate, state, query, stagger, group } from '@angular/animations';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements AfterViewInit{

  constructor(
    private authService: AuthService,
    private modalPopup:NgxSmartModalService,
  ) { }

  ngAfterViewInit(){
  }


  login(f:NgForm){
    this.authService.loginUser(f.value).subscribe(
      (response : any)=>{
        if(response){
          localStorage.setItem("token",response.token.toString())
          localStorage.setItem("user",JSON.stringify(response.user));
          this.modalPopup.close('loginModal')
        }
      },
      (err)=>{alert(err.error.message)}
    )
  }
}
