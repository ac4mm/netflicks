import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { MyListComponent } from '@my-list/my-list.component';
import { ReferfriendsComponent } from '@referfriends/referfriends.component';
import { PageNotFoundComponent } from '@page-not-found/page-not-found.component';
import { TvShowsComponent } from '@tv-shows/tv-shows.component';

import { ManageProfilesComponent } from '../../libs/feature/src/lib/manage-profiles/manage-profiles.component';
import { KidsComponent } from '../../libs/feature/src/lib/kids/kids.component';
import { LatestComponent } from '../../libs/feature/src/lib/latest/latest.component';
import { MoviesComponent } from '../../libs/feature/src/lib/movies/movies.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'ManageProfiles', component: ManageProfilesComponent },
  {
    path: 'browse',
    loadChildren: () =>
      import('libs/feature/src/lib/home/home.module').then(
        (home) => home.HomeModule
      ),
  },
  { path: 'tv-shows', component: TvShowsComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'latest', component: LatestComponent },
  { path: 'my-list', component: MyListComponent },

  { path: 'Kids', component: KidsComponent },
  {
    path: 'referfriends',
    component: ReferfriendsComponent,
  },

  {
    path: 'login',
    loadChildren: () =>
      import('libs/feature/src/lib/auth/auth.module').then(
        (auth) => auth.AuthModule
      ),
  },

  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
