import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { StarRatingComponent } from './components/star-rating/star-rating.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';

@NgModule({
  declarations: [
    NewsCardComponent,
    SpinnerComponent,
    StarRatingComponent,
    CommentItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [NewsCardComponent, SpinnerComponent, StarRatingComponent, CommentItemComponent],
})
export class SharedModule {}
