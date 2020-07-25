import { Component, OnInit, Input } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from 'src/app/service/auth.service';
import { HttpserviceService } from 'src/app/service/httpservice.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private httpService: HttpserviceService
  ) { }
  @Input() about:any;

  ngOnInit() {
    AOS.refreshHard()
  }
  isEditMode(){
    return this.authService.isEditMode();
  }
  calculateAge(){
    return new Date().getFullYear()-new Date(this.about.age).getFullYear()
  }
  downloadResume(){
    this.httpService.getResume().subscribe(
      response=>{
        const element = document.createElement('a');
        element.href = URL.createObjectURL(response);
        element.download = "Resume_Avinash";
        element.click();
      },
      err=>alert('file not found !')
    )
  }
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type});
    console.log(blob)
    // let url = window.URL.createObjectURL(blob);
    // let pwa = window.open(url);
    // if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
    //     alert( 'Please disable your Pop-up blocker and try again.');
    // }
  }
}
