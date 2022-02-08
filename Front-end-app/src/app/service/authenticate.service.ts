import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { News } from '../model/news.model';


const http = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  @Output() userLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  apiUrl: string = 'http://localhost:8080';

  constructor(private http: HttpClient, public router: Router) {

  }


  //Authentication with username and password 
  authenticateUser(user: User) {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http.post<any>('http://localhost:8080/authenticate/', {
      userName: user.userName,
      password: user.password
    }, { headers, responseType: 'text' as 'json' })


  }

   //Recommend articles to users
  recommend(id: number) {
   
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }

    return this.http
      .get<News[]>(`http://localhost:8080/api/UserFeed/csv/${id}`, httpheader);


  }


//Register user with signup details

  register(user: User): Observable<any> {


    return this.http.post('http://localhost:8080/api/Users', {
      user: user.uid,
      userName: user.userName,
      emailId: user.emailId,
      phoneNumber: user.phoneNumber,
      lastname: user.lastname,
      location: user.location,
      preferredCategory: user.preferredCategory,
      gender: user.gender,
      password: user.password,
    }, http);


  }

//to check if user is logged in
  isUserLogged(): boolean {
    let token = localStorage.getItem('token');
    return (token !== null) ? true : false;
  }


//logout user
  logout() {
    let token = localStorage.removeItem('token');
    let id = localStorage.removeItem('ID');
    let name = localStorage.removeItem('Name');
    if ((token == null) && (id == null) && (name == null)) {
      console.log("Logged out")

      this.router.navigate(['signin']);


    }
  }


}
