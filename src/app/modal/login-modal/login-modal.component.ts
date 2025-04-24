import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {

  isNewUser:boolean = false;
  constructor(
    private authService: AuthService,
    private modalPopup: NgxSmartModalService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  toggleForm(){
    this.isNewUser = !this.isNewUser;
  }

  onSubmit(f:NgForm){
    this.spinner.show()
    if(this.isNewUser){
      this.authService.signupUser(f.value).subscribe(
        (response: any) => {
          console.log(response)
          this.spinner.hide()
          alert("User registered successfully,please proceed with signin!");
          this.toggleForm()
        },
        (err) => {
          this.spinner.hide()
          alert(err.error.message)
        }
      );
    } else {
      this.authService.loginUser(f.value).subscribe(
        (response: any) => {
          this.spinner.hide()
          this.setRouteAndredirect(response)
        },
        (err) => {
          this.spinner.hide()
          alert(err.error.message)
        }
      );
    }
  }

  setRouteAndredirect(response:any){
    localStorage.setItem("token", response.token.toString())
    localStorage.setItem("user", JSON.stringify(response.user));
    this.modalPopup.close('loginModal');
    this.router.navigate(['index'],{queryParams:{email:response.user.email}})
  }

}
