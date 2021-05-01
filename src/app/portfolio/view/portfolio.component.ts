import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Observable, Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Shuffle from 'shufflejs';
import { Store } from '@ngrx/store';
import { HttpserviceService } from 'src/app/service/httpservice.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';
import { User } from 'src/app/class/user';
import * as _ from 'lodash'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

  shuffleInstance: any;
  selectedFile: File = null;
  userSubscription: Subscription;
  portfolio: any;
  selectedGroup: string;
  groupList: Array<string> = [];
  userData: Observable<User>;
  @ViewChild('shuffle', { static: false }) shuffle: ElementRef;

  constructor(
    private modalService: NgxSmartModalService,
    private store: Store,
    private httpService: HttpserviceService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private arrayService: ArrayOperationService
  ) {
    this.userData = this.store.select((state: any) => state.userData);
  }

  ngOnInit() {
    this.initGroupList();
    this.userSubscription = this.userData
      .subscribe(
        (user) => {
          if (user) {
            this.portfolio = _.cloneDeep(user.project);
            this.initGroupList(this.portfolio);
            setTimeout(() => this.initShuffle(), 0);
          }
        },
        (err) => console.log(err),
      )
  }

  initGroupList(portfolio = this.portfolio) {
    if (!portfolio) return;
    portfolio.project.forEach((item) => this.groupList.push(...item.group))
    this.groupList = Array.from(new Set(this.groupList));
  }

  upload(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = <File>event.target.files[0];
    }
  }

  moveUp(index: number) {
    if (this.arrayService.moveUp(this.portfolio.project, index)) {
      let element1 = document.querySelectorAll('.portfolio')[index];
      let element2 = document.querySelectorAll('.portfolio')[index - 1];
      element1.animate({ transform: ['scale(1,1)', 'scale(.7,.7)', 'scale(1,1)'] }, { duration: 500 })
      element2.animate({ transform: ['scale(1,1)', 'scale(.7,.7)', 'scale(1,1)'] }, { duration: 500 })
      element2.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      let element1 = document.querySelectorAll('.portfolio')[index];
      element1.animate({ transform: ['translateX(10px)', 'translateX(-10px)', 'translateX(0px)'] }, { duration: 500 })
    }

  }

  moveDown(index: number) {
    if (this.arrayService.moveDown(this.portfolio.project, index)) {
      let element1 = document.querySelectorAll('.portfolio')[index];
      let element2 = document.querySelectorAll('.portfolio')[index + 1];
      element1.animate({ transform: ['scale(1,1)', 'scale(.7,.7)', 'scale(1,1)'] }, { duration: 500 })
      element2.animate({ transform: ['scale(1,1)', 'scale(.7,.7)', 'scale(1,1)'] }, { duration: 500 })
      element2.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else {
      let element1 = document.querySelectorAll('.portfolio')[index];
      element1.animate({ transform: ['translateX(10px)', 'translateX(-10px)', 'translateX(0px)'] }, { duration: 500 })
    }
  }

  submit(form: NgForm) {
    if (this.selectedFile != null) {
      var formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name)
      this.httpService.postImageDataV2(formData).subscribe(
        (response: any) => {
          form.value.group = form.value.group ? form.value.group.split(',') : ['demo'];
          form.value.image = response.secure_url
          form.value.public_id = response.public_id
          this.portfolio.project.push(form.value)
          this.selectedFile = null;
          form.reset();
          this.spinner.hide()
        },
        (err) => { this.spinner.hide(); alert("error while uploading!"); console.log(err); }
      )
    } else if (form.value.image != null) {
      form.value.group = form.value.group ? form.value.group.split(',') : ['demo'];
      this.portfolio.project.push(form.value)
      form.reset();
    }
    else {
      alert('Select an image or paste Url.')
    }
  }

  initShuffle() {
    this.shuffleInstance = new Shuffle(this.shuffle.nativeElement, {
      itemSelector: '.items',
      sizer: null
    })
  }

  openPopup(i: number) {
    this.modalService.resetModalData('myModal')
    this.modalService.setModalData(this.portfolio.project[i], 'myModal')
    this.modalService.open('myModal');
  }

  removeProject(index: number) {
    let element1 = document.querySelectorAll('.portfolio')[index];
    element1.animate({ transform: ['scale(1,1)', 'scale(.7,.7)'] }, { duration: 250 })
    setTimeout(() => { this.portfolio.project.splice(index, 1) }, 250)
  }

  savePortfolioData() {
    this.spinner.show()
    this.httpService.postUserPortfolioSection(this.portfolio).subscribe(
      data => {
        this.spinner.hide();
      },
      err => { this.spinner.hide(); alert('Server Error!') }
    )
  }

  portfolioFilter(group) {
    this.selectedGroup = group;
    this.shuffleInstance.filter(group); // filtering projects
  }

  isLogged() {
    return this.authService.isAuthenticated()
  }
  toggleEdit() {
    this.authService.toggleEditmaode()
  }
  isEditMode() {
    return this.authService.isEditMode()
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
