import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {

  @Input() skills: Array<{
    title: string;
    progress: number;
  }>

  constructor(
    private authService:AuthService,
    private arrayService : ArrayOperationService,
  ) { }

  ngOnInit() {
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.skills,index)){
      // focus code
    }else{
      // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.skills,index)){
      // focus code
    }else{
      // focus code
    }
  }

  onSubmit(form:NgForm){
    this.skills.push(form.value)
  }

  removeSkill(index:number){
    this.skills.splice(index,1);
  }

  isEditMode(){
    return this.authService.isEditMode();
  }
}
