import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/app/model/news.model';
import { User } from 'src/app/model/user.model';
import { ApicallsService } from 'src/app/service/apicalls.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';

@Component({
  selector: 'app-user-feed',
  templateUrl: './user-feed.component.html',
  styleUrls: ['./user-feed.component.scss']
})
export class UserFeedComponent implements OnInit {
  newsList:News[]=[];
  recomList:News[]=[];

  id_user= parseInt(localStorage.getItem('ID'));
  
  ngForm : FormGroup;
  form: FormGroup;
  userId: any;
  id: any;
  userName: any;
  name: any;
  logIn=false;

  user: User={
    uid : null,
    emailId : null,
    phoneNumber:null,
    userName:null,
    lastname:null,
    location : null,
    password : null,
    preferredCategory: null,
    gender:null,
    likedList : null,
    favoriteList : null,
    savedList:null,
  }
  
  constructor(private apicall:ApicallsService,private authenticate: AuthenticateService,private model: NgbModal, private route: Router) { }
  //This component gathers the user feed which they might be interested based on alogorithm in backend.

  ngOnInit(): void {
    this.getFeed()
  }


//Get user feed and append to news data
getFeed(){
    this.apicall
    .getUserFeed(this.id_user)
    .subscribe((data) => {
      console.log(data)
      this.newsList=this.newsList.concat(data)
      console.log("news list",this.newsList)
   return this.newsList
    });
    this.getRecommend()
}
isrecom = false;


//Call recommend operation for the user
getRecommend(){

  
  this.authenticate.recommend(this.id_user)
  .subscribe((data) => {
    console.log(data)
    this.recomList=data;
    console.log("news list",this.recomList)
    if(this.recomList.length>0){
      this.isrecom=true;
    }
 return this.recomList
  });


}


login(user:User) {
  console.log("user")
  this.authenticate.authenticateUser(this.user).subscribe(
    response => {
      this.logIn=true;
      this.model.dismissAll()
      localStorage.setItem('token', 'Bearer '+response)
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

  
   this.userId=actual_token.split(",")[0]; 
   
    this.id=parseInt(this.userId.split(":")[1]); 

    this.name=actual_token.split(",")[3]; 
   
    this.userName=this.name.split(":")[1].slice(1,-2); 
  
   localStorage.setItem("ID", this.id);
   
  localStorage.setItem("Name", this.userName)
 

  
  }}

  
  isLoggedIn(){
    this.logIn = this.authenticate.isUserLogged();
   
   return this.authenticate.isUserLogged();
  }


}