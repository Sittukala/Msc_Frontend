import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { NewsComponent } from './component/news/news.component';
import { UserFeedComponent } from './component/user-feed/user-feed.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { SignupComponent } from './component/signup/signup.component';
import { NewsitemComponent } from './component/newsitem/newsitem.component';
import { FavoriteFeedsComponent } from './component/favorite-feeds/favorite-feeds.component';
import { LikedFeedsComponent } from './component/liked-feeds/liked-feeds.component';
import { GlobaldataComponent } from './component/globaldata/globaldata.component';
import { SavedFeedComponent } from './component/saved-feed/saved-feed.component';

// Routes for different components in the frontend
const routes: Routes = [
  { path: 'user-profile',   component: UserProfileComponent },
   { path: 'signup',   component: SignupComponent },
  { path: 'news',          component: NewsitemComponent },
  { path: 'personal-feed',          component: UserFeedComponent },
  { path: 'navbar',          component: NavbarComponent },
  { path: 'sidebar',          component: SidebarComponent },
  { path: 'favorites',          component: FavoriteFeedsComponent },
  { path: 'likes',          component: LikedFeedsComponent },
  { path: 'globaldata',          component: GlobaldataComponent },
  { path: 'saved',          component: SavedFeedComponent },

]; 

@NgModule({
  declarations: [],
 
  imports: [CommonModule,RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
