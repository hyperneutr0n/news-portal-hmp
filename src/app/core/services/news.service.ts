import { Injectable } from '@angular/core';
import { categories } from '@data/category.data';
import { newsCategories } from '@data/news-category.data';
import { news } from '@data/news.data';

export interface NewsWithCategory {
  id: number;
  title: string;
  preview: string;
  content: string;
  categoryName: string[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  getNewsByCategory(categoryID: number): NewsWithCategory[] {
    const newsIds = new Set(
      newsCategories
        .filter((item) => item.categoryId === categoryID)
        .map((item) => item.newsId),
    );

    const filteredNews = news.filter((item) => newsIds.has(item.id));

    return filteredNews.map((newsItem) => {
      // Get all category IDs for this news item
      const categoryIds = newsCategories
        .filter((nc) => nc.newsId === newsItem.id)
        .map((nc) => nc.categoryId);

      // Get category names for these IDs
      const categoryNames = categories
        .filter((cat) => categoryIds.includes(cat.id))
        .map((cat) => cat.name);

      return {
        id: newsItem.id,
        title: newsItem.title,
        preview: newsItem.preview,
        content: newsItem.content,
        categoryName: categoryNames,
      };
    });
  }
}
