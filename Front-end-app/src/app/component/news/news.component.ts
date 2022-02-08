import { Component, Input, OnInit } from '@angular/core';
import { News } from '../../model/news.model';
import { User } from '../../model/user.model';
import { ApicallsService } from '../../service/apicalls.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  //This component gathers the respective news article with the reactions for individual users as input and projects the data in frontend.
  //And also calls respective functionalities based on users reactions.
  @Input() news: any = {};
  @Input() list_likes: [] = [];
  @Input() list_fav: [] = [];
  @Input() list_save: [] = [];
  loadNews: any = {};




  currentuser: User = {};
  isLogin: boolean = false;

  liked: boolean = false;

  constructor(private apicall: ApicallsService) { }


  ngOnInit(): void {
    if (parseInt(localStorage.getItem('ID'))) {
      this.isLogin = true;
    }
    this.news['islikedd'] = false;
    this.news['isFavorite'] = false;



    this.list_likes.forEach(nitem => {
      if (nitem['id'] === this.news.id) {
        this.news['islikedd'] = true

        return nitem
      }



    });


    this.list_fav.forEach(nitem => {
      if (nitem['id'] === this.news.id) {
        this.news['isFavorite'] = true
        // console.log("newitem liked", nitem, this.news.id)
        return nitem
      }


    });


    this.list_save.forEach(nitem => {
      if (nitem['id'] === this.news.id) {
        this.news['isSaved'] = true
        // console.log("newitem liked", nitem, this.news.id)
        return nitem
      }
    });

  }


  //Gets the users liked news article information and marks them selected when providing the news data
  likedFeed(news) {

    this.loadNews = news;

    console.log("CURRENT post id", this.loadNews.id);
    if (parseInt(localStorage.getItem('ID'))) {
      this.isLogin = true;
      this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {
        console.log(data);
        this.currentuser[0] = data;

        const result = this.currentuser[0]["likedList"].filter(f =>
          f.id === this.loadNews.id
        );

        console.log("If the feed already liked or not", result);
        console.log(result.length > 0 ? 'liked' : 'notliked');


        if (result.length > 0) {
          console.log("indis=de likeddd", this.loadNews)
          //ES6 way of finding indexof object array
          const index = this.currentuser[0]["likedList"].findIndex((element) => {
            return element.id === this.loadNews.id
          });

          console.log("news current to be removed", index)
          this.currentuser[0]["likedList"].splice(index, 1);

          // this.currentuser[0]["likedList"].splice(this.loadNews);
          this.news['islikedd'] = false


          console.log("jobs id", this.list_likes, this.currentuser[0]["likedList"]);

          // this.liked=true;
          this.apicall.removeLikes(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

            console.log("final data", data)


          });

        }
        else {

          // this.liked=false;
          this.currentuser[0]["likedList"].push(this.loadNews);
          this.news['islikedd'] = true


          console.log("likeddata inside liked", this.list_likes)
          // this.list_likes.push(this.loadNews.id);
          //   console.log("job id", this.list_likes);


          this.apicall.addLikes(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

            console.log("final data", data)


          });



        }
        this.apicall.updateUser(this.currentuser[0], parseInt(localStorage.getItem('ID')))
          .subscribe((data) => {
            console.log("final data", data)


          });

      });
    }
    else {
      this.isLogin = false;
    }
  }

//Gets the users favorite news article information and marks them selected when providing the news data
  favoriteFeed(news) {


    this.loadNews = news;

    console.log("CURRENT post id fav", this.loadNews.id);
    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {
      console.log(data);
      this.currentuser[0] = data;

      const result = this.currentuser[0]["favoriteList"].filter(f =>
        f.id === this.loadNews.id
      );

      console.log("If the feed already fav or not", result);
      console.log(result.length > 0 ? 'fav' : 'not fav');


      if (result.length > 0) {
        console.log("indis=de fav", this.loadNews)
        //ES6 way of finding indexof object array
        const index = this.currentuser[0]["favoriteList"].findIndex((element) => {
          return element.id === this.loadNews.id
        });

        console.log("news current to be removed from fav", index)
        this.currentuser[0]["favoriteList"].splice(index, 1);

        // this.currentuser[0]["likedList"].splice(this.loadNews);
        this.news['isFavorite'] = false


        console.log("fav list", this.list_fav, this.currentuser[0]["favoriteList"]);

        // this.liked=true;
        this.apicall.removeFavorites(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

          console.log("final data", data)


        });


      }
      else {

        // this.liked=false;
        this.currentuser[0]["favoriteList"].push(this.loadNews);
        this.news['isFavorite'] = true


        this.apicall.addFavorites(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

          console.log("final data", data)


        });



      }

      this.apicall.updateUser(this.currentuser[0], parseInt(localStorage.getItem('ID')))
        .subscribe((data) => {
          console.log("final data", data)


        });

    });
  }


  //Saved Feed

  saveFeed(news) {

    this.loadNews = news;

    console.log("CURRENT post id", this.loadNews.id);
    this.apicall.getUser(parseInt(localStorage.getItem('ID'))).subscribe((data) => {
      console.log(data);
      this.currentuser[0] = data;

      const result = this.currentuser[0]["savedList"].filter(f =>
        f.id === this.loadNews.id
      );

      console.log("If the feed already saved or not", result);
      console.log(result.length > 0 ? 'Saved' : 'Not Saved');


      if (result.length > 0) {
        console.log("indis=de Saved", this.loadNews)
        //ES6 way of finding indexof object array
        const index = this.currentuser[0]["savedList"].findIndex((element) => {
          return element.id === this.loadNews.id
        });

        console.log("news current to be removed", index)
        this.currentuser[0]["savedList"].splice(index, 1);

        // this.currentuser[0]["likedList"].splice(this.loadNews);
        this.news['isSaved'] = false


        console.log("saved feed id", this.list_save, this.currentuser[0]["savedList"]);

        // this.liked=true;
        this.apicall.removeFromSave(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

          console.log("final data after remove saved", data)


        });

      }
      else {

        // this.liked=false;
        this.currentuser[0]["savedList"].push(this.loadNews);
        this.news['isSaved'] = true


        console.log("data inside saved", this.list_save)
        // this.list_likes.push(this.loadNews.id);
        //   console.log("job id", this.list_likes);


        this.apicall.saveFeed(parseInt(localStorage.getItem('ID')), this.loadNews.category).subscribe((data) => {

          console.log("final data to save", data)


        });



      }
      this.apicall.updateUser(this.currentuser[0], parseInt(localStorage.getItem('ID')))
        .subscribe((data) => {
          console.log("final data after save", data)


        });

    });
  }
}
