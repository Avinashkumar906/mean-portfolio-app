import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() experience: Array<{
    title: string;
    college: string;
    date: string;
    description: string;
  }>
  constructor(
    private authService:AuthService,
    private arrayService:ArrayOperationService
  ) { }

  ngOnInit() {
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.experience,index)){
      let element1 = document.querySelectorAll('.experience')[index];
      let element2 = document.querySelectorAll('.experience')[index-1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.experience')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.experience,index)){
      let element1 = document.querySelectorAll('.experience')[index];
      let element2 = document.querySelectorAll('.experience')[index+1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.experience')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }
  removeEducation(i: number) {
    this.experience.splice(i, 1)
  }

  onSubmit(form) {
    this.experience.push(form.value)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
