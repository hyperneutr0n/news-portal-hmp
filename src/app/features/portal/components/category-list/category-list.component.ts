import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { categories } from '@data/category.data';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  standalone: false,
})
export class CategoryListComponent implements OnInit {
  readonly categories = categories;
  constructor(private router: Router) {}

  ngOnInit() {}

  navigateToNewsList(category: string) {
    this.router.navigate(['/portal/news-list'], { queryParams: { category } });
  }
}
