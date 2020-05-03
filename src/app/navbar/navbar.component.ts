import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  width:number|string = 0;

  constructor(
    private renderer :Renderer2,
    private elRef:ElementRef
  ) { }

  ngOnInit() {
  }

  toggleMenu(){
    this.width = this.width === 0 ? 300 : 0;
    let action = `width : ${this.width}px`
    let element = this.elRef.nativeElement.querySelector('.menu')
    this.renderer.setAttribute(element,'style',action)
  }

  closeMenu(){
    this.width = 0;
    let element = this.elRef.nativeElement.querySelector('.menu')
    this.renderer.setAttribute(element,'style','width:0px')
  }

  openMenu(){
    this.width = 300;
    let element = this.elRef.nativeElement.querySelector('.menu')
    this.renderer.setAttribute(element,'style','width:300px')
  }

}
