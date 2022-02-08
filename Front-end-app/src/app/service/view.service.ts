import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ViewState } from '../model/view-state';



@Injectable({
  providedIn: 'root'
})
export class ViewService {


  constructor(private http: HttpClient) { }


  view: ViewState = {
   
      isRecommend : false,
     
  }
  searchTerm = new BehaviorSubject([]);


}