import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from '../../service/userservice.service';

import Shuffle from 'shufflejs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit,OnDestroy {
  
  shuffleInstance:any;
  userSubscription:Subscription;
  projects:Array<any>;
  shuffleInit : Boolean = false;
  portfolio:any = this.userService.getPortfolio();
  
  constructor(
    private modalService:NgxSmartModalService,
    private userService: UserserviceService,
  ) { }
  
  ngOnInit() {
    this.userSubscription = this.userService.userData
    .pipe(pluck('portfolio'))
    .subscribe(
      (portfolio) => { 
        this.portfolio = portfolio;
      },
      (err)=>console.log(err),
    )
  }

  getProjects(){
    if(this.portfolio){
      return this.portfolio.project
    } 
  }
  initShuffle(){
    if(!this.shuffleInit){
      this.shuffleInstance = new Shuffle(document.querySelector('.portfolio-items'), {
        itemSelector: '.items',
        sizer: null
      })
      this.shuffleInit = true;
    }
  }

  openPopup(i:number){
    this.modalService.setModalData( this.portfolio.project[i],'myModal')
    this.modalService.open('myModal');
  }
  
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }


  portfolioFilter(event){
    this.initShuffle()
    document.querySelector('.portfolio-filters .active')
      .removeAttribute('class') //remove active tab
    event.target.className = 'active' //add css to active tab
    this.shuffleInstance.filter(`${event.target.getAttribute("data-group")}`); // filtering projects
  }

}
