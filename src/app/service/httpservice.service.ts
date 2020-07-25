import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../class/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserserviceService } from './userservice.service';
import { environment } from 'src/environments/environment'
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
    this.http.get(`${environment.apiHostName}/userdata`).subscribe(
      (data)=>{
        this.userService.updateUser(new User(<User>data))
        this.spinner.hide()
      },
      (error) =>{
        this.spinner.hide()
      }
    )
  }
  getResume(){
    const httpOptions = {
      responseType: 'blob' as 'json',
    };
    return this.http.get(`${environment.apiHostName}/resume`,httpOptions)
  }
  postNameAndBio(data){
    return this.http.post(`${environment.apiHostName}/nameandbio`, data)
  }
  postUserContactSection(data?:any): Observable<any> {
    data = data ? data : this.userService.getContact()
    return this.http.post(`${environment.apiHostName}/usercontact`,data)
  }
  postUserResumeSection(data?:any): Observable<any> {
    data = data ? data : this.userService.getResume()
    return this.http.post(`${environment.apiHostName}/userresume`, data)
  }
  postUserAboutSection(data?:any){
    data = data ? data : this.userService.getAbout()
    return this.http.post(`${environment.apiHostName}/userabout`, data)
  }
  postUserPortfolioSection(data?:any){
    data = data ? data : this.userService.getPortfolio()
    return this.http.post(`${environment.apiHostName}/userportfolio`, data)
  }
  postMail(maildata:any){
    return this.http.post(`${environment.apiHostName}/mail`, maildata)
  }
  postImageDataV2(data){
    return this.http.post(`${environment.apiHostName}/uploadimagev2`, data)
  }

}
