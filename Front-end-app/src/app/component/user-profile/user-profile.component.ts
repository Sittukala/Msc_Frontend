import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { ApicallsService } from 'src/app/service/apicalls.service';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  //Collects the user profile information and projects them in the frontend and allows users to edit anytime.
  logIn: boolean =false;

 
  constructor(private apicall: ApicallsService, private authenticate : AuthenticateService) { 

    this.loadprofile = true;
  }
   id= parseInt(localStorage.getItem('ID'));
   user: User;
   loadprofile = true;
   editprofile = false;
   chartsdata = false;

  
   locations = [
    { name: 'United Stastes of America', code: 'us' },
    { name: 'United Kingdoms', code: 'gb' },
    { name: 'India', code: 'in' }
  ];



  currentUser: Object = {};
   successupdate: boolean =false;

  ngOnInit(): void {
    this.loadprofile = true;
    this.getUser()
   
  }

  //To get user details for providing personal information
  getUser(){
    this.apicall.getUserDetails( this.id ).subscribe((data) =>{
      this.user = data;
      console.log("user data", this.user)
      return data ;
  });
  return this.user;
  }

  //To load the respective user profile
  loadProfile(){
    this.loadprofile = true;
    this.editprofile = false;
    this.chartsdata = false;
  }

  //Allow to edit the profile
  editProfile(){
    this.editprofile = true;
    this.loadprofile = false;
    this.chartsdata = false;
  }


  //Update the user data in server 
  updateUser(){
  
    this.apicall.updateUser(this.user,this.id).subscribe(data => {
      console.log("current user" + this.user)
      this.successupdate=true;
    });
  
  }


  //To check if user logged in  
  isLoggedIn(){
    this.logIn = this.authenticate.isUserLogged();

   
   return this.authenticate.isUserLogged();
  }


  //Load user charts to show category-weight rate
  loadcharts(){
    this.user=this.getUser()
    console.log("user data" + this.user)
    this.editprofile = false;
    this.loadprofile = false;
    this.chartsdata = true;
  
var chart = am4core.create("chartdiv", am4charts.PieChart);

// Add data
chart.data = [{
  "category": "Business",
  "value": this.user.map['business'],
  "color": am4core.color("#cf0a80")
}, {
  "category": "Entertainment",
  "value": this.user.map['entertainment'],
  "color": am4core.color("#a72dbd")
}, {
  "category": "Sports",
  "value": this.user.map['sports'],
  "color": am4core.color("#631bf2")
}, {
  "category": "Health",
  "value": this.user.map['health'],
  "color": am4core.color("#24bbe0")
}, {
  "category": "Technology",
  "value": this.user.map['technology'],
  "color": am4core.color("#def03e")
},
{
  "category": "Science",
  "value": this.user.map['science'],
  "color": am4core.color("#ed1139")
}
];

// configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "value";
pieSeries.dataFields.category = "category";
pieSeries.slices.template.propertyFields.fill = "color";

chart.legend = new am4charts.Legend();
chart.radius = am4core.percent(80);


  }
}