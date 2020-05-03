import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserserviceService } from '../../service/userservice.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpserviceService } from '../../service/httpservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-resume',
  templateUrl: './edit-resume.component.html',
  styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit,OnDestroy {
  ngOnDestroy(){
    console.log('unsubscribe editresume cmponent!')
    this.userSubscrition.unsubscribe();
  }
  constructor(
    private userService : UserserviceService,
    private formBuilder : FormBuilder,
    private httpService: HttpserviceService,
    private router : Router
  ) { }
  
  form:FormGroup;
  user = this.userService.getUser(); 
  userSubscrition = new Subscription;
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      education: this.formBuilder.array([
        this.initEducation(), 
        this.initEducation(), 
        this.initEducation() 
      ]),
      experience:this.formBuilder.array([
        this.initExperience(),
        this.initExperience(),
        this.initExperience()
      ]),
      testimonial:this.formBuilder.array([
        this.initTestimonial(),
        this.initTestimonial(),
        this.initTestimonial()
      ])
    })
    this.userSubscrition = this.userService.userData.subscribe(
      user=>this.form.patchValue(user.resume),
      err=>{}
    ) 
  }

  onSubmit(){
    this.httpService.postUserResumeSection(this.form.value).subscribe(
      (response:any)=>{
        this.form.reset()
        this.httpService.getUserData()
        this.router.navigate(['resume'])
      },
      (err)=>console.log(err)
    )
  }
  removeEducationGroup(temp){
    let control = this.form.get('education') as FormArray;
    control.removeAt(temp)
  }
  addEducationGroup(){
    let control = this.form.get('education') as FormArray;
    control.push(this.initEducation())
  }
  removeExperienceGroup(temp){
    let control = this.form.get('experience') as FormArray;
    control.removeAt(temp);
  }
  addExperienceGroup(){
    let control = this.form.get('experience') as FormArray;
    control.push(this.initExperience())
  }
  removeTestimonialGroup(temp){
    let control = this.form.get('testimonial') as FormArray;
    control.removeAt(temp)
  }
  addTestimonialGroup(){
    let control = this.form.get('testimonial') as FormArray;
    control.push(this.initTestimonial())
  }
  initEducation(){
    return this.formBuilder.group({
      title:[null, Validators.required],
      college:[null, Validators.required],
      date:[null, Validators.required],
      description:[null, Validators.required]
    })
  }
  initTestimonial(): any {
    return this.formBuilder.group({
      clientName:[null, Validators.required],
      position:[null, Validators.required],
      company:[null, Validators.required],
      saying:[null, Validators.required]
    })
  }
  initExperience(){
    return this.formBuilder.group({
      title:[null, Validators.required],
      college:[null, Validators.required],
      date:[null, Validators.required],
      description:[null, Validators.required]
    })
  }
}
