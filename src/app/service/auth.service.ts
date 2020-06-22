import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  editmode:boolean = false;

  constructor(private http:HttpClient) { }

  isAuthenticated() : boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false;
    } else {
      return true;
    }
  }
  isEditMode(){
    if(this.isAuthenticated()){
      return this.editmode;
    } else {
      return false;
    }
  }
  toggleEditmaode(){
    this.editmode = !this.editmode;
  }
  loginUser(data){
    return this.http.post('https://api4asquare.herokuapp.com/userlogin', data)
  }
  signupUser(data){
    return this.http.post('https://api4asquare.herokuapp.com/postsignup', data)
  }

}
