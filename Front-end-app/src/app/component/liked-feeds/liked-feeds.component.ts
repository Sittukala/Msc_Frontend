import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/user.model';
import { ApicallsService } from 'src/app/service/apicalls.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-liked-feeds',
  templateUrl: './liked-feeds.component.html',
  styleUrls: ['./liked-feeds.component.scss']
})
export class LikedFeedsComponent implements OnInit {
  //This component gathers the liked feeds from the users and puts them on separate page for the users.

  currentuser: User = {};
  list_likes: any = [];
  logIn = false;



  ngForm: FormGroup;
  form: FormGroup;
  userId: any;
  id: any;
  userName: any;
  name: any;


  user: User = {
    uid: null,
    emailId: null,
    phoneNumber: null,
    userName: null,
    lastname: null,
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
    this.getUsersLikedList()
  }

//Get users likes data from respective users
  getUsersLikedList() {

    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {

      this.currentuser[0] = data;
      this.list_likes = this.list_likes.concat(this.currentuser[0]["likedList"])

      return this.list_likes;

    });
  }

  isLoggedIn() {
    this.logIn = this.authenticate.isUserLogged();

    return this.authenticate.isUserLogged();
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
