import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';
import { NewsContent, NewsService } from '@services/news.service';

register();

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  standalone: false,
})
export class NewsDetailComponent implements OnInit {
  news: NewsContent = {} as NewsContent;
  newsId: number = 0;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private newsService: NewsService,
  ) {}

  ngOnInit() {
    const newsId = this.route.snapshot.paramMap.get('id');
    if (!newsId) {
      return;
    }
    this.newsId = parseInt(newsId);
    this.news = this.newsService.getNewsContent(this.newsId);
  }

  goBack() {
    this.location.back();
  }
}
