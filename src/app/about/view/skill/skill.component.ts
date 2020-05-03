import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  getEven(n?:number,x?:number):Array<any>{
    let arr = []
    for(let i = 0; i < this.skills.length; i+=2){
      arr.push(this.skills[i])
    }
    return arr;
  }
  getOdd(n?:number,x?:number):Array<any>{
    let arr = []
    for(let i = 1; i < this.skills.length; i+=2){
      arr.push(this.skills[i])
    }
    return arr;
  }
}
