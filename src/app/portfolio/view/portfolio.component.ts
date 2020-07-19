import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from '../../service/userservice.service';
import Shuffle from 'shufflejs';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit,OnDestroy {

  shuffleInstance:any;
  selectedFile:File = null;
  userSubscription:Subscription;
  shuffleInit : Boolean = false;
  portfolio:any = this.userService.getPortfolio();

  constructor(
    private modalService:NgxSmartModalService,
    private userService: UserserviceService,
    private httpService: HttpserviceService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private arrayService:ArrayOperationService
  ) { }

  ngOnInit() {
    this.userSubscription = this.userService.userData
    .pipe(pluck('portfolio'))
    .subscribe(
      (portfolio) => {
        this.portfolio = portfolio;
        console.log(portfolio)
      },
      (err)=>console.log(err),
    )
  }

  upload(event){
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
    }
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.portfolio.project,index)){
      // focus code
    }else{
      // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.portfolio.project,index)){
      // focus code
    }else{
      // focus code
    }
  }

  submit(form:NgForm){
    if(this.selectedFile != null){
      var formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name)
      this.httpService.postImageDataV2(formData).subscribe(
        (response:any)=>{
          form.value.group = form.value.group ? form.value.group.split(',') : ['demo'];
          form.value.image = response.secure_url
          form.value.public_id = response.public_id
          this.portfolio.project.push(form.value)
          this.selectedFile = null;
          form.reset();
          this.spinner.hide()
        },
        (err)=>{this.spinner.hide();alert("error while uploading!");console.log(err);}
      )
      } else if (form.value.image != null){
        form.value.group = form.value.group ? form.value.group.split(',') : ['demo'];
        this.portfolio.project.push(form.value)
        form.reset();
      }
      else{
        alert('Select an image or paste Url.')
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
    this.modalService.resetModalData('myModal')
    this.modalService.setModalData( this.portfolio.project[i],'myModal')
    this.modalService.open('myModal');
  }

  removeProject(i){
    this.portfolio.project.splice(i,1)
  }

  savePortfolioData(){
    this.spinner.show()
    this.httpService.postUserPortfolioSection().subscribe(
        data=>{
          this.spinner.hide();
        },
        err=>{this.spinner.hide();alert('Server Error!')}
      )
  }

  portfolioFilter(event){
    this.initShuffle()
    document.querySelector('.portfolio-filters .active')
      .removeAttribute('class') //remove active tab
    event.target.className = 'active' //add css to active tab
    this.shuffleInstance.filter(`${event.target.getAttribute("data-group")}`); // filtering projects
  }

  isLogged(){
    return this.authService.isAuthenticated()
  }
  toggleEdit(){
    this.authService.toggleEditmaode()
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
  ngOnDestroy(){
    this.userSubscription.unsubscribe()
  }
}
