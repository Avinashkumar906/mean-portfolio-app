import { Component, OnInit, Input } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) { }
  @Input() about:any;

  ngOnInit() {
    AOS.refreshHard()
  }
  isEditMode(){
    return this.authService.isEditMode();
  }
  calculateAge(){
    return new Date().getFullYear()-new Date(this.about.age).getFullYear()
  }

}
