import { Injectable } from '@angular/core';
import { User } from '../class/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor() { }
  user: User;
  userData = new Subject<User>()

  getUser() {
    return this.user;
  }

  getAbout(): any {
    if (this.user)
      return this.user.about;
  }

  getResume(): any {
    if (this.user)
      return this.user.resume;
  }

  getPortfolio(): any {
    if (this.user)
      return this.user.project;
  }

  getContact(): any {
    if (this.user)
      return this.user.contact;
  }

  updateUser(user: User) {
    this.user = user;
    this.userData.next(this.user);
  }

}
