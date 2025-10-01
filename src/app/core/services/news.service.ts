import { Injectable } from '@angular/core';
import { News } from '@models/news.model';
import { CategoryService } from '@services/category.service';
import { RatingService } from '@services/rating.service';
import { FavoriteService } from '@services/favorite.service';
import { news } from '@data/news.data';
import { newsCategories } from '@data/news-category.data';

export interface NewsList {
  id: number;
  title: string;
  mainImgeUrl: string;
  categoryNames: string[];
  rating: number;
}

export interface NewsContent {
  id: number;
  title: string;
  mainImageUrl: string;
  content: string;
  contentImageUrl: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(
    private categoryService: CategoryService,
    private ratingService: RatingService,
    private favoriteService: FavoriteService,
  ) {}

  getNewsList(categoryId: number): NewsList[] {
    const newsIds = new Set(
      newsCategories
        .filter((item) => item.categoryId === categoryId)
        .map((item) => item.newsId),
    );

    const filteredNews = news.filter((item) => newsIds.has(item.id));

    return this.filteredNewsMapper(filteredNews);
  }

  getNewsContent(newsId: number): NewsContent {
    const readNews = news.find((item) => item.id === newsId);

    if (!readNews) {
      return {} as NewsContent;
    }

    return {
      id: readNews.id,
      title: readNews.title,
      mainImageUrl: 'https://picsum.photos/400/300',
      content: readNews.content,
      contentImageUrl: [
        'https://picsum.photos/400/300',
        'https://picsum.photos/400/300',
        'https://picsum.photos/400/300',
      ],
    };
  }

  searchNews(query: string): NewsList[] {
    const filteredNews = news.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );

    return this.filteredNewsMapper(filteredNews);
  }

  getFavoriteNews(userId: number): NewsList[] {
    const favoriteNews = this.favoriteService.getFavoritesByUser(userId);
    const newsIds = new Set(favoriteNews.map((item) => item.newsId));

    const filteredNews = news.filter((item) => newsIds.has(item.id));

    return this.filteredNewsMapper(filteredNews);
  }

  private filteredNewsMapper(news: News[]): NewsList[] {
    return news.map((newsItem) => {
      return {
        id: newsItem.id,
        title: newsItem.title,
        mainImgeUrl: 'https://picsum.photos/400/300',
        categoryNames: this.categoryService
          .getCategoriesNamesForNews(newsItem.id)
          .map((cat) => cat.name),
        rating: this.ratingService.getAverageRatingForNews(newsItem.id),
      };
    });
  }
}
