import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations'
import { HttpserviceService } from './service/httpservice.service';
import * as AOS from 'aos';
import { switchMap } from 'rxjs/operators'
import { of } from 'rxjs';
import { User } from './class/user';
import { Store } from '@ngrx/store';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {

  email:string;
  constructor(
    private httpService: HttpserviceService,
    private route:ActivatedRoute,
    private store: Store,
    private spinner: NgxSpinnerService
  ) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
    this.spinner.show();
    this.route.queryParams.pipe(
      switchMap(({email}) => {
        return this.httpService.getUserData(email)
      })
    ).subscribe(
      (data) => {
        let user = new User(<User>data);
        this.store.dispatch({ type: "ADD", payload: user })
        this.spinner.hide()
      },
      (error) => {
        this.spinner.hide()
      }
    )
    
    AOS.init({
      duration: 500,
      easing: 'ease-in-back',
    })
  }

}
