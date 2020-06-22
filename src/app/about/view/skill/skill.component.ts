import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { NgForm } from '@angular/forms';

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
    private authService:AuthService
  ) { }

  ngOnInit() {
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
