import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';

@NgModule({
  declarations: [
    NewsCardComponent,
    SpinnerComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [NewsCardComponent, SpinnerComponent, StarRatingComponent],
})
export class SharedModule {}
