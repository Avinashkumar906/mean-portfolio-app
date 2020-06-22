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

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit,OnDestroy {

  shuffleInstance:any;
  userSubscription:Subscription;
  shuffleInit : Boolean = false;
  response:any = {image: '', public_id: ''}
  portfolio:any = this.userService.getPortfolio();

  constructor(
    private modalService:NgxSmartModalService,
    private userService: UserserviceService,
    private httpService: HttpserviceService,
    private authService: AuthService
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
  openUploader(){
    document.getElementById('uploader').click();
  }

  upload(event,form){
    if (event.target.files.length > 0) {
      var formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name)
      this.httpService.postImageData(formData).subscribe(
        (response:any)=>{
          this.response.image = response.secure_url
          this.response.public_id = response.public_id
        },
        (err)=>console.log(err)
      )
    }
  }
  submit(form:NgForm){
    console.log
    if(form.value.image || (this.response.image !== '' && this.response.public_id !== '')){
      form.value.group = form.value.group.split(',')
      form.value.image = form.value.image ? form.value.image : this.response.image;
      form.value.public_id = form.value.image ? '' : this.response.public_id;
      this.portfolio.project.push(form.value)
      this.response = { image:'', public_id:'' }
      form.reset()
    } else {
      alert('Please Upload a Project Image or Paste Image Url')
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

  removeProject(i){
    this.portfolio.project.splice(i,1)
  }

  savePortfolioData(){
  this.httpService.postUserPortfolioSection().subscribe(
      data=>{
        alert('Updated Successfully!')
      },
      err=>alert('Server Error!')
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
