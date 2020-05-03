import { Component, OnInit, Input } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor() { }
  @Input() about:any;

  ngOnInit() {
    AOS.refreshHard()
  }

  calculateAge(){
    return new Date().getFullYear()-new Date(this.about.age).getFullYear()
  }

}
