import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss']
})
export class NavbarMenuComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private modalService :NgxSmartModalService
  ) { }

  ngOnInit() {
  }

  toggleSignin(){
    if(!this.authService.isAuthenticated())
      this.modalService.open('loginModal')
    else
      localStorage.removeItem("token")
  }
  isloggedIn(){
    return this.authService.isAuthenticated()
  }

}
