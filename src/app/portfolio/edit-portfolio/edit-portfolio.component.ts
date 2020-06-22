import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../service/userservice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { User } from '../../class/user';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpserviceService } from '../../service/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-portfolio',
  templateUrl: './edit-portfolio.component.html',
  styleUrls: ['./edit-portfolio.component.scss']
})
export class EditPortfolioComponent implements OnInit {

  constructor(
    private userService : UserserviceService,
    private formBuilder : FormBuilder,
    private httpService: HttpserviceService,
    private router: Router
  ) { }

  form: FormGroup;
  user = this.userService.getUser();
  userSubscrition = new Subscription;

  ngOnInit() {
    this.form = this.formBuilder.group({
      project: this.formBuilder.array([
        // this.initPortfolio(),
        // this.initPortfolio(),
        // this.initPortfolio()
      ])
    })
    this.userSubscrition = this.userService.userData.subscribe(
      user=>{
        for(let i = 0; i < user.portfolio.project.length; i++){
          this.addPortfolioGroup();
        }
        this.form.patchValue(user.portfolio)
      },
      err=>{}
    )
  }

  onSubmit(){
    this.httpService.postUserPortfolioSection(this.form.value).subscribe(
      (response:any)=>{
        this.form.reset()
        this.httpService.getUserData();
        this.router.navigate(['portfolio'])
      },
      (err)=>console.log(err)
    )
  }
  removeProjectGroup(temp){
    let control = this.form.get('project') as FormArray;
    control.removeAt(temp)
  }
  addPortfolioGroup(){
    let control = this.form.get('project') as FormArray;
    control.push(this.initPortfolio())
  }
  removeGroup(index,temp){
    let control = (<FormArray>this.form.get('project')).at(index).get('group') as FormArray;
    control.removeAt(temp)
  }
  addGroup(index:number){
    let control = (<FormArray>this.form.get('project')).at(index).get('group') as FormArray;
    control.push(this.initControl())
  }
  upload(event,index){
    if (event.target.files.length > 0) {
      var formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name)
      // (<FormArray>this.form.get('project')).at(index).get('image').setValue('hi');
      this.httpService.postImageData(formData).subscribe(
        (response:any)=>{
          this.form.value.project[index].image = response.url;
        },
        (err)=>console.log(err)
      )
    }
  }
  initPortfolio(){
    return this.formBuilder.group({
      name:[null, Validators.required],
      image:[null, Validators.required],
      title:[null, Validators.required],
      description:[null, Validators.required],
      youtube:[null, Validators.required],
      link:[null, Validators.required],
      group:this.formBuilder.array([
        this.initControl()
      ])
    })
  }
  initControl(){
    return this.formBuilder.control(null)
  }

}
