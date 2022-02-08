import { Component, NgZone, OnInit } from '@angular/core';
import { User } from '../../model/user.model'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { AuthenticateService } from '../../service/authenticate.service';
import { Router } from '@angular/router';
import { ViewState } from '../../model/view-state';
import { ViewService } from 'src/app/service/view.service';
import { BehaviorSubject } from 'rxjs';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  //Menus in the side bar and respective routes
  { path: '/personal-feed', title: 'PERSONAL FEED', icon: 'fa fa-compass', class: '' },
  { path: '/user-profile', title: 'USER PROFILE', icon: 'fa fa-user', class: '' },
  // { path: '/signup', title: 'Sign UP',  icon:'users_single-02', class: '' },
  { path: '/news', title: 'NEWS', icon: 'fa fa-globe', class: '' },
  { path: '/favorites', title: 'FAVORITE FEEDS', icon: 'fa fa-heart', class: '' },
  { path: '/likes', title: 'LIKED FEEDS', icon: 'fa fa-thumbs-up', class: '' },
  { path: '/saved', title: 'READ LATER', icon: 'fas fa-download', class: '' },

  { path: '/globaldata', title: 'LOCATION FILTER', icon: 'fa fa-globe fa-spin', class: '' },

];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  ngForm: FormGroup;
  form: FormGroup;



  constructor(private authenticate: AuthenticateService, private model: NgbModal, private route: Router, private zone: NgZone, private viewService: ViewService,) { }

  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  display: String;
  userId: any;
  id: any;
  userName: any;
  name: any;
  logIn = false;

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
  //  idnum:number;
  private search = new BehaviorSubject([]);
  searchText: string;
  _searchTerm: any;
  isOpen: boolean = true;
  menuItems: any[];

  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.viewService.searchTerm.next(this._searchTerm)
    console.log("this.view", this.viewService.searchTerm)

  }

  open() {
    this.isOpen = true;
    document.getElementById("mySidebar").style.display = "block";
  }

  close() {
    document.getElementById("mySidebar").style.display = "none";
  }

  //Syncronized VIEW
  get view(): ViewState {
    return this.viewService.view;
  }

  login(user: User) {

    console.log("user")
    this.authenticate.authenticateUser(this.user).subscribe(

      response => {
        console.log("in recommend response", response)

        this.logIn = true;
        this.model.dismissAll()
        localStorage.setItem('token', 'Bearer ' + response)
        this.setUser(response)
        this.route.navigate(['/user-profile'])
        var id = parseInt(localStorage.getItem("ID"));

        this.authenticate.recommend(id).subscribe((res) => {
          console.log("in recommend", res, this.view.isRecommend)
          if (res.length != 0) {
            this.view.isRecommend = true;
          }
        });

        // window.location.reload();


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



  logout() {

    // this.zone.run(() => {
    //   this.logIn=false;
    // }); 

    this.authenticate.logout();


    this.route.navigate(["/news"]);
    window.location.reload()
  }

  isLoggedIn() {
    this.logIn = this.authenticate.isUserLogged();

    return this.authenticate.isUserLogged();
  }



}
