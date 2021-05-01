import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store'
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/app/class/user';
import * as _ from 'lodash'

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private httpService: HttpserviceService,
    private authService: AuthService,
    private store: Store
  ) {
    this.userData = this.store.select((state: any) => state.userData);
  }

  private userSubscription: Subscription;
  resume: any;
  userData: Observable<User>

  ngOnInit() {
    this.userSubscription = this.userData
      .subscribe(
        (user) => this.resume = user && _.cloneDeep(user.resume),
        (err) => console.log(err),
      )
  }
  saveResumeData() {
    this.httpService.postUserResumeSection(this.resume).subscribe(
      data => alert('Info Saved Successfully!'),
      err => alert('Server Error!')
    )
  }
  isLoggedIn() {
    return this.authService.isAuthenticated()
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
  toggleEdit() {
    this.authService.toggleEditmaode()
  }
}
