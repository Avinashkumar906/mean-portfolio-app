import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayOperationService {
  
  constructor() { }

  moveUp(array,index:number){
    if(index>0){
      let temp = array[index-1];
      array[index-1] = array[index]
      array[index] = temp;
      return true;
    } else {
      alert("already on top!")
      return false;
    }
  }

  moveDown(array,index:number){
    if(index<(array.length-1)){
      let temp = array[index+1];
      array[index+1] = array[index]
      array[index] = temp;
      return true;
    } else {
      alert("already on Bottom!")
      return false;
    }
  }
}
