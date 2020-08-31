import { NgForm } from '@angular/forms';
import { pluck } from 'rxjs/operators'
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserserviceService } from '../../service/userservice.service';
import { HttpserviceService } from '../../service/httpservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  // @ViewChild('f',{read: NgForm, static:true}) form;
  private userSubscription:Subscription;

  contact:any = this.userService.getContact() ;

  constructor(
    private userService: UserserviceService,
    private spinner: NgxSpinnerService,
    private httpService:HttpserviceService,
    private authService:AuthService
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.userData
    .pipe(pluck('contact'))
    .subscribe(
      (contact) => {
        console.log(contact)
        this.contact = contact;
      },
      (err)=>console.log(err),
      ()=>this.spinner.hide()
    )
  }
  onSubmit(form:NgForm){
    this.spinner.show()
    let data = new Object({
      to: "avinashkumar906@gmail.com",
      from: form.value.email,
      subject: `${form.value.subject} | Ngx5Template`,
      html: ` <h2>Hi Sandy,</h2><br/><h2>${form.value.message}</h2><br/><h4>Regards,</h4><h4>${form.value.name}</h4>`,
    })
    this.httpService.postMail(data).subscribe(
      (response)=>{
          form.resetForm()
          this.spinner.hide()
          alert('Mail send!')
      },
      (err)=>{
        this.spinner.hide()
        alert('Error in snding Mail !')
        console.log(err)
      },
    )
  }
  isLogged(){
    return this.authService.isAuthenticated()
  }
  toggleEdit(){
    this.authService.toggleEditmaode();
  }
  isEditMode(){
    return this.authService.isEditMode();
  }
  saveContactData(){
    this.httpService.postUserContactSection().subscribe(
      data=>{
        alert('Updated Successfully!')
      },
      err=>alert('Server Error!')
    )
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
}
