import { Injectable } from '@angular/core';
import { CategoryService } from '@services/category.service';
import { RatingService } from '@services/rating.service';
import { newsCategories } from '@data/news-category.data';
import { news } from '@data/news.data';

export interface NewsList {
  id: number;
  title: string;
  mainImgeUrl: string;
  categoryNames: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(
    private categoryService: CategoryService,
    private ratingService: RatingService,
  ) {}

  getNewsList(categoryID: number): NewsList[] {
    const newsIds = new Set(
      newsCategories
        .filter((item) => item.categoryId === categoryID)
        .map((item) => item.newsId),
    );

    const filteredNews = news.filter((item) => newsIds.has(item.id));

    return filteredNews.map((newsItem) => {
      return {
        id: newsItem.id,
        title: newsItem.title,
        mainImgeUrl: 'https://picsum.photos/400/300',
        categoryNames: this.categoryService.getCategoriesNamesForNews(newsItem.id).map(cat => cat.name),
        rating: this.ratingService.getAverageRatingForNews(newsItem.id),
      };
    });
  }
}
