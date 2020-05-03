import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

  @Input() experience:Array<{
    title:string;
    college:string;
    date:string;
    description:string;
  }>
  constructor() { }

  ngOnInit() {
  }

}
