import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerTransition } from './router.animations'
import { HttpserviceService } from './service/httpservice.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerTransition]
})
export class AppComponent implements OnInit {

  constructor(
    private httpService: HttpserviceService,
  ) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  ngOnInit() {
    this.httpService.getUserData()
    AOS.init({
      duration: 500,
      easing: 'ease-in-back',
    })
  }

}
