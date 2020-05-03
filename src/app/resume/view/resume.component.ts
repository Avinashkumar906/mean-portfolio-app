import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from '../../service/userservice.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(
    private spinner:NgxSpinnerService,
    private userService:UserserviceService
  ) { }

  private userSubscription:Subscription;
  resume:any = this.userService.getResume();
  
  ngOnInit() {
    this.userSubscription = this.userService.userData
    .pipe(pluck('resume'))
    .subscribe(
      (resume)=>this.resume = resume,
      (err)=>console.log(err),
      ()=>this.spinner.hide()
    )
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }

}
