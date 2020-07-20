import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ArrayOperationService } from 'src/app/service/array-operation.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss']
})
export class TestimonialComponent implements OnInit {
  @Input() testimonial:Array<{
    clientName:string;
    position:string;
    company:string;
    saying:string;
  }>;
  constructor(
    private authService:AuthService,
    private arrayService:ArrayOperationService
  ) { }

  ngOnInit() {
  }

  carouselOptions = {
    nav: false,
    dots: true,
    responsiveClass: true,
    autoPlay:true,
    responsive: {
      0: {
        items: 1,
        loop: false
      },
      768: {
        items: 2,
        loop: false
      },
      1500: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  }

  moveUp(index:number){
    if(this.arrayService.moveUp(this.testimonial,index)){
      let element1 = document.querySelectorAll('.testimonial')[index];
      let element2 = document.querySelectorAll('.testimonial')[index-1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      // element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.testimonial')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.testimonial,index)){
      let element1 = document.querySelectorAll('.testimonial')[index];
      let element2 = document.querySelectorAll('.testimonial')[index+1];
      element1.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      element2.animate({transform:['scale(1,1)','scale(.7,.7)','scale(1,1)']},{duration:500})
      // element2.scrollIntoView({behavior:'smooth', block:'center'})
    }else{
      let element1 = document.querySelectorAll('.testimonial')[index];
      element1.animate({transform:['translateX(10px)','translateX(-10px)','translateX(0px)']},{duration:500})
    }
  }
  removeComment(index:number){
    let element1 = document.querySelectorAll('.testimonial')[index];
    element1.animate({transform:['scale(1,1)','scale(.7,.7)']},{duration:250})
    setTimeout(()=>{this.testimonial.splice(index,1)},250)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
