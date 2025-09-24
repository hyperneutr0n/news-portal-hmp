import { Injectable } from '@angular/core';
import { Category } from '@models/category.model';
import { categories } from '@data/category.data';
import { newsCategories } from '@data/news-category.data';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  getCategoryId(name: string): number | undefined {
    return categories.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    )?.id;
  }

  getCategoryName(id: number): string | undefined {
    return categories.find((item) => item.id === id)?.name;
  }

  getCategoriesNamesForNews(newsId: number): Category[] {
    return categories.filter((cat) =>
      newsCategories
        .filter((item) => item.newsId === newsId)
        .map((item) => item.categoryId)
        .includes(cat.id),
    );
  }

  getAllCategories(): Category[] {
    return categories;
  }
}
