import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from '../../service/userservice.service';
import { pluck } from 'rxjs/operators';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(
    private spinner:NgxSpinnerService,
    private userService:UserserviceService,
    private httpService:HttpserviceService,
    private authService:AuthService
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
  saveResumeData(){
    this.httpService.postUserResumeSection().subscribe(
      data=>alert('Info Saved Successfully!'),
      err=>alert('Server Error!')
    )
  }
  isLoggedIn(){
    return this.authService.isAuthenticated()
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
  toggleEdit(){
    this.authService.toggleEditmaode()
  }
}
