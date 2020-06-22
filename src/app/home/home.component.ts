import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserserviceService } from '../service/userservice.service';
import { User } from '../class/user';
import { Subscription } from 'rxjs';
import { Particle } from './particle';
import { HttpserviceService } from '../service/httpservice.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  bgImageUrl:string = 'url(./assets/img/background.jpg)';

  constructor(
    private userService: UserserviceService,
    private httpService: HttpserviceService,
    private authService: AuthService
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
  saveToServer(){
    let data = new Object({ name:this.user.name, bio: this.user.bio })
    this.httpService.postNameAndBio(data).subscribe(
      (response)=>alert('Data Saved!'),
      (err)=>alert('Server Error!')
    )
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
  toggleEdit(){
    this.authService.toggleEditmaode();
  }
}
