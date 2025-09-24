import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NewsFavoritesComponent } from './components/news-favorites/news-favorites.component';
import { NewsSearchComponent } from './components/news-search/news-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TabsComponent } from './components/tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: CategoryListComponent
      },
      {
        path: 'news-list',
        component: NewsListComponent
      },
      {
        path: 'favorites',
        component: NewsFavoritesComponent
      },
      {
        path: 'search',
        component: NewsSearchComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'news-detail/:id',
        component: NewsDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
