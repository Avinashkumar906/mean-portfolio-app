import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserserviceService } from '../../service/userservice.service';
import { pluck } from 'rxjs/operators';
import { AuthService } from 'src/app/service/auth.service';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit,OnDestroy {

  constructor(
    private userService:UserserviceService,
    private authService:AuthService,
    private httpService:HttpserviceService
  ) { }

  private userSubscription:Subscription;
  about:any = this.userService.getAbout();

  ngOnInit() {
    this.userSubscription = this.userService.userData
    .pipe(pluck('about'))
    .subscribe(
      (about)=>this.about = about,
      (err)=>console.log(err)
    )
  }
  saveAboutData(){
    this.httpService.postUserAboutSection().subscribe(
      (data)=>alert('Saved successfully!'),
      (err)=>alert('Server Error!')
    )
  }
  isLogged(){
    return this.authService.isAuthenticated();
  }
  toggleEdit(){
    this.authService.toggleEditmaode()
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

}
