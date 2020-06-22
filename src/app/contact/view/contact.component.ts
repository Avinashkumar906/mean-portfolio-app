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

  @ViewChild('f',{read: NgForm, static:true}) form;
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
  onSubmit(){
    this.spinner.show()
    this.httpService.postMail(this.form.value).subscribe(
      (response)=>{
        if(response[0].statusCode === 202){
          this.form.resetForm()
          alert('Mail send!')
          this.spinner.hide()
        } else {
          this.spinner.hide()
          alert('unable to send mail!')
          throw new Error('unable to send mail!')
        }
      },
      (err)=>{
        this.spinner.hide()
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
