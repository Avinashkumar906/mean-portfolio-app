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
      // focus code
    }else{
      // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.education,index)){
      // focus code
    }else{
      // focus code
    }
  }

  removeEducation(i:number){
    this.education.splice(i, 1)
  }

  onSubmit(form){
    this.education.push(form.value)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
