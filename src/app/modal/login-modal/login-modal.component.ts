import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements AfterViewInit {

  constructor(
    private authService: AuthService,
    private modalPopup: NgxSmartModalService,
    private spinner: NgxSpinnerService,
  ) { }

  ngAfterViewInit() {
  }


  login(f: NgForm) {
    this.spinner.show()
    this.authService.loginUser(f.value).subscribe(
      (response: any) => {
        if (response) {
          this.spinner.hide()
          localStorage.setItem("token", response.token.toString())
          localStorage.setItem("user", JSON.stringify(response.user));
          this.modalPopup.close('loginModal')
        }
      },
      (err) => {
        this.spinner.hide()
        alert(err.error.message)
      }
    )
  }
}
