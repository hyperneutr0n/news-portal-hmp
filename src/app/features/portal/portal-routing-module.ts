import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NewsFavoritesComponent } from './components/news-favorites/news-favorites.component';
import { NewsSearchComponent } from './components/news-search/news-search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'news-list',
    pathMatch: 'full'
  },
  {
    path: 'news-list',
    component: NewsListComponent
  },
  {
    path: 'news-detail/:id',
    component: NewsDetailComponent
  },
  {
    path: 'categories',
    component: CategoryListComponent
  },
  {
    path: 'favorites',
    component: NewsFavoritesComponent
  },
  {
    path: 'search',
    component: NewsSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
