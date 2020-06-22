import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

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
    private authService:AuthService
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
        loop: true
      },
      768: {
        items: 2,
        loop: true
      },
      1500: {
        items: 3,
        nav: true,
        loop: true
      }
    }
  }

  removeComment(i:number){
    this.testimonial.splice(i,1)
  }
  isEditMode(){
    return this.authService.isEditMode()
  }
}
