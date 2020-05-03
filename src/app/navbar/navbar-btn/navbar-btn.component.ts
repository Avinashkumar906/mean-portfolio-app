import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-btn',
  templateUrl: './navbar-btn.component.html',
  styleUrls: ['./navbar-btn.component.scss']
})
export class NavbarBtnComponent implements OnInit {
  href:string = "";
  constructor(
  ) { }

  ngOnInit() {
  }

  returnClass(){
    // this.route.snapshot
  }

}
