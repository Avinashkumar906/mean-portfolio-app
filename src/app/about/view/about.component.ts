import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { Store } from '@ngrx/store';
import { User } from 'src/app/class/user';
import * as _ from 'lodash';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, OnDestroy {

  constructor(
    private authService: AuthService,
    private httpService: HttpserviceService,
    private store: Store
  ) {
    this.userData = this.store.select((state: any) => state.userData);
  }

  private userSubscription: Subscription;
  userData: Observable<User>;
  about: any;

  ngOnInit() {
    this.userSubscription = this.userData
      .subscribe(
        (user) => this.about = user && _.cloneDeep(user.about),
        (err) => console.log(err)
      )
  }
  saveAboutData() {
    this.httpService.postUserAboutSection(this.about).subscribe(
      (data) => alert('Saved successfully!'),
      (err) => alert('Server Error!')
    )
  }
  isLogged() {
    return this.authService.isAuthenticated();
  }
  toggleEdit() {
    this.authService.toggleEditmaode()
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }

}
