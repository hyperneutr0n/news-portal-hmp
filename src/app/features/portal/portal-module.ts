import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PortalRoutingModule } from './portal-routing-module';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsDetailComponent } from './components/news-detail/news-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { NewsFavoritesComponent } from './components/news-favorites/news-favorites.component';
import { NewsSearchComponent } from './components/news-search/news-search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { SharedModule } from '@shared/shared-module';

@NgModule({
  declarations: [
    NewsListComponent,
    NewsDetailComponent,
    CategoryListComponent,
    NewsFavoritesComponent,
    NewsSearchComponent,
    ProfileComponent,
    TabsComponent,
    DrawerComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule,
    PortalRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PortalModule {}
