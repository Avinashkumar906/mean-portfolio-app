import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { User } from '../class/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from './userservice.service';

@Injectable({
  providedIn: 'root'
})
export class HttpserviceService {

  constructor(
    private http:HttpClient,
    private spinner: NgxSpinnerService,
    private userService:UserserviceService
  ) {} 
  
  getUserData(){
    this.spinner.show();
    this.http.get('https://api4asquare.herokuapp.com/getuserdata').subscribe(
      (data)=>{
        this.userService.updateUser(new User(<User>data))
        this.spinner.hide()
      },
      (err) =>{
        console.log(err)
        this.spinner.hide()
      }
    )
  }
  postImageData(data){
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this.http.post('https://api4asquare.herokuapp.com/uploadimage', data, { headers })
  }
  postUserSection(data): Observable<any> {
    return this.http.post('https://api4asquare.herokuapp.com/postuserdata',data)    
  }
  postUserResumeSection(data): Observable<any> {
    return this.http.post('https://api4asquare.herokuapp.com/postresumedata',data)    
  }
  postUserAboutSection(data){
    return this.http.post('https://api4asquare.herokuapp.com/postaboutdata',data)
  }
  postUserPortfolioSection(data){
    return this.http.post('https://api4asquare.herokuapp.com/postportfoliodata',data)
  }
  postMail(maildata:any){
    return this.http.post('https://api4asquare.herokuapp.com/postmailtoadmin', maildata)
  }

}
