import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

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
    private authService:AuthService
  ) { }

  ngOnInit() {
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
