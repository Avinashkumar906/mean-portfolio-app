import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserserviceService } from '../../service/userservice.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit,OnDestroy {

  constructor(
    private userService:UserserviceService,
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
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

}
