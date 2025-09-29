import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { CommentItemComponent } from './components/comment-item/comment-item.component';

@NgModule({
  declarations: [
    NewsCardComponent,
    CommentItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [NewsCardComponent, CommentItemComponent],
})
export class SharedModule {}
