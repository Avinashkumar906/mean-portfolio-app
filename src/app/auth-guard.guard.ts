import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authService:AuthService, private modalService:NgxSmartModalService){}
  canActivate(){
    if(!this.authService.isAuthenticated()){
      this.modalService.open('loginModal')
      return false;
    } else
    return true;
  }
}
