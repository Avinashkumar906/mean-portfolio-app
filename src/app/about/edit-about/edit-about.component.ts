import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormControl,FormArray,FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserserviceService } from '../../service/userservice.service';
import { HttpserviceService } from '../../service/httpservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-about',
  templateUrl: './edit-about.component.html',
  styleUrls: ['./edit-about.component.scss']
})
export class EditAboutComponent implements OnInit {
  constructor(
    private userService : UserserviceService,
    private formBuilder : FormBuilder,
    private httpService: HttpserviceService,
    private router: Router
  ) { }
  
  form:FormGroup;
  user = this.userService.getUser(); 
  userSubscrition = new Subscription;
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[null,Validators.required],
      designation:[null,Validators.required],
      position:[null, Validators.required],
      age:[null, Validators.required],
      city:[null, Validators.required],
      country:[null, Validators.required],
      description:[null, Validators.required],
      services: this.formBuilder.array([
        this.initServices(),
        this.initServices(),
        this.initServices(),
        this.initServices()  
      ]),
      skills:this.formBuilder.array([
        this.initSkills(),
        this.initSkills(),
        this.initSkills(),
        this.initSkills(),
        this.initSkills(),
        this.initSkills()
      ]),
      pricing:this.formBuilder.array([
        this.initPricing(),
        this.initPricing()
      ])
    })
    this.userSubscrition = this.userService.userData.subscribe(
      user=>this.form.patchValue(user.about),
      err=>{}
    ) 
  }
  onSubmit(){    
    this.httpService.postUserAboutSection(this.form.value).subscribe(
      (response:any)=>{
        this.form.reset()
        this.httpService.getUserData()
        this.router.navigate(['about'])
      },
      (err)=>console.log(err)
    )
  }
  formReset(){
    this.form.reset()
  }
  removePricingGroup(temp){
    let control = this.form.get('pricing') as FormArray;
    control.removeAt(temp)
  }
  addPricingGroup(){
    let control = this.form.get('pricing') as FormArray;
    control.push(this.initPricing())
  }
  removeSkillsGroup(temp){
    let control = this.form.get('skills') as FormArray;
    control.removeAt(temp)
  }
  addSkillsGroup(){
    let control = this.form.get('skills') as FormArray;
    control.push(this.initSkills())
  }
  removeServicesGroup(temp){
    let control = this.form.get('services') as FormArray;
    control.removeAt(temp)
  }
  addServicesGroup(){
    let control = this.form.get('services') as FormArray;
    control.push(this.initServices())
  }
  addServiceGroup(temp){
    let control = (<FormArray>this.form.get('pricing')).at(temp).get('services') as FormArray;
    control.push(this.initControl())
  }
  removeServiceGroup(index,temp){
    let control = (<FormArray>this.form.get('pricing')).at(index).get('services') as FormArray;
    control.length !==1 ? control.removeAt(temp): null ;
  }
  initServices(){
    return this.formBuilder.group({
      image:[null, Validators.required],
      title:[null, Validators.required],
      description:[null, Validators.required]
    })
  }
  initSkills(): any {
    return this.formBuilder.group({
      title:[null, Validators.required],
      progress:[null, Validators.required]
    })
  }
  initPricing(){
    return this.formBuilder.group({
      title:[null, Validators.required],
      price:[null, Validators.required],
      services:this.formBuilder.array([
        this.initControl() ,         
        this.initControl()  ,        
        this.initControl()          
      ])
    })
  }
  initControl(){
    return this.formBuilder.control(null,Validators.required)
  }
}
