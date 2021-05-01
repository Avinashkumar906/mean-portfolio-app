import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpserviceService } from '../../service/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/class/user';
import * as _ from 'lodash';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // @ViewChild('f',{read: NgForm, static:true}) form;
  private userSubscription: Subscription;
  userData: Observable<User>;
  contact: any;

  constructor(
    private spinner: NgxSpinnerService,
    private httpService: HttpserviceService,
    private authService: AuthService,
    private store: Store
  ) {
    this.userData = this.store.select((state: any) => state.userData)
  }

  ngOnInit() {
    this.userSubscription = this.userData
      .subscribe(
        (user) => {
          this.contact = user && _.cloneDeep(user.contact);
        },
        (err) => console.log(err),
        () => this.spinner.hide()
      )
  }
  onSubmit(form: NgForm) {
    this.spinner.show()
    let data = new Object({
      to: "avinashkumar906@gmail.com",
      from: form.value.email,
      subject: `${form.value.subject} | Ngx5Template`,
      html: ` <h2>Hi Sandy,</h2><br/><h2>${form.value.message}</h2><br/><h4>Regards,</h4><h4>${form.value.name}</h4>`,
    })
    this.httpService.postMail(data).subscribe(
      (response) => {
        form.resetForm()
        this.spinner.hide()
        alert('Mail send!')
      },
      (err) => {
        this.spinner.hide()
        alert('Error in snding Mail !')
        console.log(err)
      },
    )
  }
  isLogged() {
    return this.authService.isAuthenticated()
  }
  toggleEdit() {
    this.authService.toggleEditmaode();
  }
  isEditMode() {
    return this.authService.isEditMode();
  }
  saveContactData() {
    console.log(this.contact)
    this.httpService.postUserContactSection(this.contact).subscribe(
      data => {
        alert('Updated Successfully!')
      },
      err => alert('Server Error!')
    )
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
