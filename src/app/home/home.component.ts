import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../class/user';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpserviceService } from '../service/httpservice.service';
import { AuthService } from '../service/auth.service';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private httpService: HttpserviceService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private store: Store
  ) {
    this.userData = this.store.select((state: any) => state.userData)
  }

  userData: Observable<User>;
  private userSubscription: Subscription;
  user: User;

  ngOnInit() {
    this.userSubscription = this.userData.subscribe(
      (user) => {
        this.user = user && _.clone(user);
      },
      (err) => console.log(err),
    )
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
  getBackground() {
    let background: String;
    if (this.user) {
      background = `url(${this.user.image})`
    }
    return background;
  }
  saveToServer() {
    this.spinner.show();
    let data = new Object({ name: this.user.name, bio: this.user.bio, image: this.user.image })
    this.httpService.postNameAndBio(data).subscribe(
      (response) => this.spinner.hide(),
      (err) => { this.spinner.hide(); alert('Server Error!'); }
    )
  }
  isEditMode() {
    return this.authService.isEditMode()
  }
  toggleEdit() {
    this.authService.toggleEditmaode();
  }
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated()
  }
}
