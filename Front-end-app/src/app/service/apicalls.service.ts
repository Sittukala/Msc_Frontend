import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../model/news.model';
import { User } from '../model/user.model';


@Injectable({
  providedIn: 'root'
})
export class ApicallsService {

  constructor(private http: HttpClient) { }


//Gets news for general newsfeed
  getNews() {

    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }

    return this.http
      .get('http://localhost:8080/api/News/news');


  }

//Get country specific news for amcharts visualization
  getNewsByCountry(country: String) {

    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }

    return this.http
      .get(`http://localhost:8080/api/News/location/${country}`, httpheader);


  }

//Filter country and category based news and country and category are selected by users.
  getNewsByCountCat(country: String, category: String) {

    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }

    return this.http
      .get(`http://localhost:8080/api/News/cateloc/${country}/${category}`, httpheader);


  }

//Get user personalized news where parameter id is the user id.
  getUserFeed(id: number) {

    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }

    return this.http
      .get<News[]>(`http://localhost:8080/api/UserFeed/${id}`, httpheader);


  }

  
//Get user details for profile information and details for front end display
  getUser(id: number): Observable<User[]> {
    console.log("id", id)
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.get<User[]>(`http://localhost:8080/api/Users/userId/${id}`, header)
  }

//Used in some cases of profile
  getUserDetails(id: number): Observable<User> {
    console.log("id", id)
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.get<User>(`http://localhost:8080/api/Users/userId/${id}`, header)
  }

  //Add likes based on user clicking on like icon
  addLikes(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))

    }
    console.log("liked categopry", category, id)
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/liked/${category}`, httpheader)
  }

//Remove likes based on user interests
  removeLikes(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))

    }
    console.log("liked categopry", category, id)
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/unlike/${category}`, httpheader)
  }

   //Add Favorites based on user clicking on add to favorites - heart icon
  addFavorites(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/favorite/${category}`, httpheader)
  }

  //Remove favorites based on user interests
  removeFavorites(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/unfavorite/${category}`, httpheader)
  }

//Remove saved feeds based on user interests
  removeFromSave(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/delete/${category}`, httpheader)
  }

//Add Saved feeds based on user clicking on save icon
  saveFeed(id: number, category: String) {
    var httpheader = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    return this.http.post<void>(`http://localhost:8080/api/UserFeed/${id}/save/${category}`, httpheader)
  }

//Update operations and details to user data on server
  updateUser(user: User, id: number) {
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', localStorage.getItem('token'))
    }
    console.log("log", user);
    return this.http.put<User[]>(`http://localhost:8080/api/Users/userId/update/${id}`, user, header);
  }

}
