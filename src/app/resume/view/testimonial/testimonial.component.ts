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
      // focus code
    }else{
      // focus code
    }
  }

  moveDown(index:number){
    if(this.arrayService.moveDown(this.testimonial,index)){
      // focus code
    }else{
      // focus code
    }
  }
  removeComment(i:number){
    this.testimonial.splice(i,1)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
