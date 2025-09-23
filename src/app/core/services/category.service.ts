import { Injectable } from '@angular/core';
import { Category } from '@models/category.model';
import { categories } from '@data/category.data';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = categories;

  getAllCategories(): Category[] {
    return this.categories;
  }
}
