import { any } from '@amcharts/amcharts4/.internal/core/utils/Array';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { ViewState } from 'src/app/model/view-state';
import { ApicallsService } from 'src/app/service/apicalls.service';
import { ViewService } from 'src/app/service/view.service';
import { News } from '../../model/news.model';

@Component({
  selector: 'app-newsitem',
  templateUrl: './newsitem.component.html',
  styleUrls: ['./newsitem.component.scss']
})
export class NewsitemComponent implements OnInit {


  ngForm: FormGroup;
  form: FormGroup;

  // searchTerm : string;
  newsList: any = [];
  searchList: any = [];
  list_likes: any = [];
  list_fav: any = [];
  list_save: any = [];
  currentuser: User = {};
  search: any;
  _searchTerm: string = '';


  get searchTerm(): string {
    return this._searchTerm;
  }

  // This setter is called everytime the value in the search text box changes
  set searchTerm(value: string) {
    this.newsList = [];
    this._searchTerm = value;

    console.log("this.view", this._searchTerm)
    this.getNews()

  }
  constructor(private apicall: ApicallsService, private viewService: ViewService) {


  }

  ngOnInit(): void {
    this.viewService.searchTerm.subscribe(value => this.search = value)

    //This component works to get the general news data from the api and lists the news with their respective reactions if any.
    if (parseInt(localStorage.getItem('ID'))) {

      this.getUsersLikeFavList()
    }
    else {

      //This method gets the news data from server
      this.getNews()
    }
  }

  //This function collects the likes, favorites and saved lists for logged in user.
  getUsersLikeFavList() {
    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {
      this.currentuser[0] = data;
      this.list_likes = this.list_likes.concat(this.currentuser[0]["likedList"])
      this.list_fav = this.list_fav.concat(this.currentuser[0]["favoriteList"])
      this.list_save = this.list_save.concat(this.currentuser[0]["savedList"])

      console.log("list of likes in news comp", this.list_likes);
      this.getNews()
      return this.list_likes;

    });
  }


  filtered_props = ['id', 'title', 'country', 'category', 'author', 'source']


  get view(): ViewState {
    return this.viewService.view;
  }


  // Call get news feed function
  getNews() {
    this.apicall
      .getNews()
      .subscribe((data) => {
        console.log("sss", this._searchTerm)


        this.newsList = this.newsList.concat(data)
        if (this._searchTerm === '' || this._searchTerm === null) {
          this.newsList = this.newsList

        }
        else {

          this.searchList = this.newsList.filter(p =>


            p['title'].toLowerCase().includes(this._searchTerm.toLowerCase()) ||
            p['category'].toLowerCase().includes(this._searchTerm.toLowerCase())

          )
          this.searchList.filter((item, index) => this.searchList.indexOf(item) === index);


          this.newsList = this.searchList
        }
        this.newsList.filter((item, index) => this.newsList.indexOf(item) === index);



      });


    return this.newsList;

  }


}
