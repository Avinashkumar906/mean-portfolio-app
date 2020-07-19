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
        // focus code
    }else{
        // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.experience,index)){
        // focus code
    }else{
        // focus code
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
