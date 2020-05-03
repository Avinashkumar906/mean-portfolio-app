import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../../service/userservice.service';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpserviceService } from '../../service/httpservice.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'] 
})
export class EditComponent implements OnInit {
  constructor(
    private userService : UserserviceService,
    private formBuilder : FormBuilder,
    private httpService: HttpserviceService,
    private router:Router
  ) { }
  
  form:FormGroup;
  user = this.userService.getUser(); 
  userSubscrition = new Subscription;
    
  ngOnInit() {
    this.form = this.formBuilder.group({
      email:[null,Validators.required],
      name:[null,Validators.required],
      bio:[null, Validators.required],
      password:[null, Validators.required],
      image:[null, Validators.required],
      contact:this.formBuilder.group({
        address:this.formBuilder.group({
          line1:[null,Validators.required],
          line2:[null,Validators.required],
        }),
        contact:this.formBuilder.group({
          mob:[null,Validators.required],
          email:[null,Validators.required],
        }),
        web:this.formBuilder.group({
          url:[null,Validators.required],
          url2:[null,Validators.required],
        })
        // social:this.formBuilder.group({
        //   facebook:[null,Validators.required],
        //   insta:[null,Validators.required],
        //   twitter:[null,Validators.required],
        //   linkedink:[null,Validators.required],
        // })
      })
    })
    this.userSubscrition = this.userService.userData.subscribe(
      user=>this.form.patchValue(user),
      err=>{}
    ) 
  }

  upload(event){
    if (event.target.files.length > 0) {
      var formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name)
      console.log(formData.get)
      this.httpService.postImageData(formData).subscribe(
        (response:any)=>{
          this.form.get('image').setValue(response.url)
        },
        (err)=>console.log(err)
      )
    }
  }

  onSubmit(){
    this.httpService.postUserSection(this.form.value).subscribe(
      (response:any)=>{
        this.form.reset()
        this.httpService.getUserData();
        this.router.navigate(['contact'])
      },
      (err)=>console.log(err)
    )
  }
}
