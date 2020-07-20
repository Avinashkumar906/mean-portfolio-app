import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {

  @Input() education:Array<{
    title:string;
    college:string;
    date:string;
    description:string;
  }>
  constructor(
    private authService:AuthService,
    private arrayService:ArrayOperationService
  ) { }

  ngOnInit() {
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.education,index)){
      let element1 = document.querySelectorAll('.education')[index];
      let element2 = document.querySelectorAll('.education')[index-1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.education')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.education,index)){
      let element1 = document.querySelectorAll('.education')[index];
      let element2 = document.querySelectorAll('.education')[index+1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.education')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  removeEducation(index:number){
    let element1 = document.querySelectorAll('.education')[index];
    element1.animate({transform:['scale(1,1)','scale(.7,.7)']},{duration:250})
    setTimeout(()=>{this.education.splice(index,1)},250)
  }

  onSubmit(form){
    this.education.push(form.value)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
