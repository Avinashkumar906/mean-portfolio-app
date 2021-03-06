import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';
import { User } from '../class/user';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpserviceService } from '../service/httpservice.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  constructor(
    private userService: UserserviceService,
    private httpService: HttpserviceService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}

  private userSubscription:Subscription;
  user:User = this.userService.getUser() ? this.userService.getUser(): undefined ;

  ngOnInit() {
    this.userSubscription = this.userService.userData.subscribe(
      (user) => {
        this.user = user;
      },
      (err)=>console.log(err),
    )
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
  getBackground(){
    let background:String;
    if(this.user){
      background = `url(${this.user.image})`
    }
    return background;
  }
  saveToServer(){
    this.spinner.show();
    let data = new Object({ name:this.user.name, bio: this.user.bio, image: this.user.image })
    this.httpService.postNameAndBio(data).subscribe(
      (response)=>this.spinner.hide(),
      (err)=>{this.spinner.hide();alert('Server Error!');}
    )
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
  toggleEdit(){
    this.authService.toggleEditmaode();
  }
  isAuthenticated():boolean{
    return this.authService.isAuthenticated()
  }
}
