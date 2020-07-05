import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscription, observable } from 'rxjs';
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
      (error) =>{
        this.spinner.hide()
      }
    )
  }
  postNameAndBio(data){
    return this.http.post('https://api4asquare.herokuapp.com/nameandbio' , data)
  }
  postUserContactSection(data?:any): Observable<any> {
    data = data ? data : this.userService.getContact()
    return this.http.post('https://api4asquare.herokuapp.com/postcontactdata',data)
  }
  postUserResumeSection(data?:any): Observable<any> {
    data = data ? data : this.userService.getResume()
    return this.http.post('https://api4asquare.herokuapp.com/postresumedata', data)
  }
  postUserAboutSection(data?:any){
    data = data ? data : this.userService.getAbout()
    return this.http.post('https://api4asquare.herokuapp.com/postaboutdata', data)
  }
  postUserPortfolioSection(data?:any){
    data = data ? data : this.userService.getPortfolio()
    return this.http.post('https://api4asquare.herokuapp.com/postportfoliodata', data)
  }
  postMail(maildata:any){
    return this.http.post('https://api4asquare.herokuapp.com/postmailtoadmin', maildata)
  }
  postImageData(data){
    this.spinner.show();
    const headers = new HttpHeaders().set('InterceptorSkipHeader', '');
    return this.http.post('https://api4asquare.herokuapp.com/uploadimage', data, { headers })
  }

}
