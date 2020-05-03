import { Component, OnInit, Input } from '@angular/core';

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
  constructor() { }

  ngOnInit() {
  }

}
