import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from "@services/category.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: false,
})
export class CategoryListComponent implements OnInit {
  constructor(
    private router: Router, 
    private categoryService: CategoryService
  ) {}

  ngOnInit() {}
  
  readonly categories = this.categoryService.getAllCategories();

  navigateToNewsList(category: string) {
    this.router.navigate(['/portal/news'], { queryParams: { category } });
  }
}
