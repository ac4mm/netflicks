import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { LatestComponent } from './latest/latest.component';
import { MyListComponent } from './my-list/my-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { TvShowsComponent } from './tv-shows/tv-shows.component';
import { MoviesComponent } from './movies/movies.component';

import { HttpClientModule } from '@angular/common/http';
import { SelectUserService } from './shared/services/select-user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TvShowsComponent,
    MoviesComponent,
    LatestComponent,
    MyListComponent,
    PageNotFoundComponent,
    MoviesComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [SelectUserService],
})
export class AppModule { }
