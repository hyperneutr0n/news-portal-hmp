import { Injectable } from '@angular/core';
import { Category } from '@models/category.model';
import { categories } from '@data/category.data';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  getCategoryId(name: string): number | undefined {
    return categories.find(item => item.name.toLowerCase() === name.toLowerCase())?.id
  }

  getAllCategories(): Category[] {
    return categories;
  }
}
