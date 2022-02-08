import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
 import { SignupComponent } from './component/signup/signup.component';
import { NewsComponent } from './component/news/news.component';
import { UserFeedComponent } from './component/user-feed/user-feed.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NewsitemComponent } from './component/newsitem/newsitem.component';
import { FavoriteFeedsComponent } from './component/favorite-feeds/favorite-feeds.component';
import { LikedFeedsComponent } from './component/liked-feeds/liked-feeds.component';
import { LocationComponent } from './component/location/location.component';
import { GlobaldataComponent } from './component/globaldata/globaldata.component';
import { SavedFeedComponent } from './component/saved-feed/saved-feed.component';
@NgModule({
  declarations: [
   
    AppComponent,
    NavbarComponent,
    SignupComponent,
    NewsComponent,
    UserFeedComponent,
    UserProfileComponent,
    SidebarComponent,
    NewsitemComponent,
    FavoriteFeedsComponent,
    LikedFeedsComponent,
    LocationComponent,
    GlobaldataComponent,
    SavedFeedComponent,
  
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    BrowserModule,
    MatStepperModule,
     MatInputModule,
     MatButtonModule,
     MatListModule,
     MatRadioModule,
     MatFormFieldModule,
     RouterModule,
     NgbModule,
     FormsModule,
     BrowserModule,
      ReactiveFormsModule,
     
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
