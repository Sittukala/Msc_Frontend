import { Component, OnInit } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import { ApicallsService } from 'src/app/service/apicalls.service';
import { User } from 'src/app/model/user.model';
import { News } from 'src/app/model/news.model';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-globaldata',
  templateUrl: './globaldata.component.html',
  styleUrls: ['./globaldata.component.scss']
})
export class GlobaldataComponent implements OnInit {

  //This component projects the news data into the country and category location filter based on amcharts. 
  //It has functions thaat loads the globe and filter the news based on selected country and category information.
  newsByCountry: News = {};
  constructor(private apicall: ApicallsService, private authservice: AuthenticateService) { }

  test: any = "all";

  // Make category name store Observable
  public categoryname$ = new BehaviorSubject<string>("");

  // Setter to update category
  setcategoryname(val: string) {
    this.test = val;
    this.categoryname$.next(val);
    console.log("category is", this.categoryname$)
  }
  id = parseInt(localStorage.getItem('ID'));
  country: any = "AR";
  ngOnInit(): void {

    if (this.id) {
      this.getUser()
    }
    else {
      this.loadglobe(this.country);
    }

    this.test = "all";


  }


  user: User;

//Get user details for populating news with respective location of users
  getUser() {
    this.apicall.getUserDetails(this.id).subscribe((data) => {
      this.user = data;
      if (this.user.location) {
        this.country = this.user.location;
        console.log("user country", this.country)

      }
      console.log("user data", this.user)
      this.loadglobe(this.country)
      return data;

    });
    console.log("users country", this.country)

  }

  //Basic structure from amcharts to load the globe with polygon series
  loadglobe(country) {
    var globe = am4core.create("chartdiv", am4maps.MapChart);
    globe.panBehavior = "rotateLongLat";
    globe.geodata = am4geodata_worldLow;

    globe.projection = new am4maps.projections.Orthographic();

    var pseries = globe.series.push(new am4maps.MapPolygonSeries());

    pseries.useGeodata = true;


    let animate;
    //Rotate globe animation
    setTimeout(function () {
      animate = globe.animate({ property: "deltaLongitude", to: 90000 }, 19000000);
    }, 3000)

    globe.seriesContainer.events.on("down", function () {
      if (animate) {
        animate.stop();
      }
    })



    var polygonTemplate = pseries.mapPolygons.template;
    polygonTemplate.strokeWidth = 0.5;

    polygonTemplate.fill = am4core.color("#6ACF90");
    polygonTemplate.stroke = am4core.color("#ffffff");




    polygonTemplate.tooltipText = "{name}";
    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#C70039");
    pseries.mapPolygons.template.events.on(
      'hit',
      async (ev: any) => {
        if (ev) {
          country = ev.target.dataItem.dataContext.id;
        }
        console.log("selected ", country);

        if (this.test === "all") {
          this.apicall
            .getNewsByCountry(country)
            .subscribe((data) => {

              this.newsByCountry = data;

              console.log("filtered news by selected country", data, this.newsByCountry)
            });
        }
        else {
          this.apicall
            .getNewsByCountCat(country, this.test)
            .subscribe((data) => {

              this.newsByCountry = data;

              console.log("filtered news by selected country", data, this.newsByCountry)
            });
        }

      });

    console.log("in globaldata")

    if (this.test === "all") {
      this.apicall
        .getNewsByCountry(country)
        .subscribe((data) => {

          this.newsByCountry = data;

          console.log("filtered news by selected country", data, this.newsByCountry)
        });
    }
    else {
      this.apicall
        .getNewsByCountCat(country, this.test)
        .subscribe((data) => {

          this.newsByCountry = data;

          console.log("filtered news by selected country", data, this.newsByCountry)
        });
    }

//Based on changes of behavioral subject subscribe to changes in data
    this.categoryname$.subscribe(() => {
      if (this.test === "all") {

        this.apicall
          .getNewsByCountry(country)
          .subscribe((data) => {

            this.newsByCountry = data;

            console.log("filtered news by selected country", data, this.newsByCountry)
          });
      }
      else {

        this.apicall
          .getNewsByCountCat(country, this.test)
          .subscribe((data) => {

            this.newsByCountry = data;

            console.log("filtered  inside news by selected country", data, this.newsByCountry)
          });
      }
    });
    globe.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 2;
    // globe.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#D7F6FC");
    globe.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#9AE7FD");

//Country data into amcharts
    pseries.data = [{
      "id": "CA",
      "name": "Canada",
      "fill": am4core.color("#8B0000")
    }, {
      "id": "AU",
      "name": "Australia",
      "fill": am4core.color("#008000")
    },
    {
      "id": "NZ",
      "name": "New Zealand",
      "fill": am4core.color("#140B8A")
    }];

    polygonTemplate.propertyFields.fill = "fill";



  }
}


