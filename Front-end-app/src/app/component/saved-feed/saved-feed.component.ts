import { Component, OnInit } from '@angular/core';
import { ApicallsService } from 'src/app/service/apicalls.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user.model';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-saved-feed',
  templateUrl: './saved-feed.component.html',
  styleUrls: ['./saved-feed.component.scss']
})
export class SavedFeedComponent implements OnInit {

    //This component gathers the saved feeds from the users and puts them on separate page for the users.

  currentuser: User = {};
  list_save: any = [];
  logIn = false;



  ngForm: FormGroup;
  form: FormGroup;
  userId: any;
  id: any;
  userName: any;
  name: any;
  loadNews: any = {};

  user: User = {
    uid: null,
    emailId: null,
    phoneNumber: null,
    lastname: null,
    userName: null,
    location: null,
    password: null,
    preferredCategory: null,
    gender: null,
    likedList: null,
    favoriteList: null,
    savedList: null,
  }
  constructor(private apicall: ApicallsService, private authenticate: AuthenticateService, private model: NgbModal, private route: Router) { }

  ngOnInit(): void {
    this.getUsersSavedList()
  }

  //call user and save to list of saved feeds.
  getUsersSavedList() {

    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {

      this.currentuser[0] = data;
      this.list_save = this.list_save.concat(this.currentuser[0]["savedList"])

      return this.list_save;

    });
  }

  isLoggedIn() {
    this.logIn = this.authenticate.isUserLogged();

    return this.authenticate.isUserLogged();
  }

  //Call remove save function
  removeSave(news) {
    this.loadNews = news;

    console.log("CURRENT post id", this.loadNews.id);
    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {
      console.log(data);
      this.currentuser[0] = data;
      console.log("indis=de Saved", this.loadNews)
      //ES6 way of finding indexof object array
      const index = this.currentuser[0]["savedList"].findIndex((element) => {
        return element.id === this.loadNews.id
      });

      console.log("news current to be removed", index)
      this.currentuser[0]["savedList"].splice(index, 1);
      this.list_save.splice(index, 1);
      // this.currentuser[0]["likedList"].splice(this.loadNews);
      news['isSaved'] = false


      console.log("saved feed id", this.list_save, this.currentuser[0]["savedList"]);

      // this.liked=true;
      this.apicall.removeFromSave(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

        console.log("final data after remove saved", data)


      });
      this.apicall.updateUser(this.currentuser[0], parseInt(localStorage.getItem('ID')))
        .subscribe((data) => {
          console.log("final data", data)


        });

    });

  }


  login(user: User) {
    console.log("user")
    this.authenticate.authenticateUser(this.user).subscribe(
      response => {
        this.logIn = true;
        this.model.dismissAll()
        localStorage.setItem('token', 'Bearer ' + response)
        this.setUser(response)
        this.route.navigate(['/user-profile'])
        window.location.reload();
      },
      err => console.log(err)
    )
  }
  setUser(res) {
    var bearer_token = localStorage.getItem('token');
    let actual_token;
    if (bearer_token) {
      actual_token = bearer_token.split(".")[1];
      actual_token = window.atob(actual_token);
      let decoded_token = JSON.parse(actual_token)


      this.userId = actual_token.split(",")[0];

      this.id = parseInt(this.userId.split(":")[1]);

      this.name = actual_token.split(",")[3];

      this.userName = this.name.split(":")[1].slice(1, -2);

      localStorage.setItem("ID", this.id);

      localStorage.setItem("Name", this.userName)



    }
  }


}
