import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@services/category.service';
import { NewsService, NewsWithCategory } from '@services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  standalone: false,
})
export class NewsListComponent implements OnInit {
  category: string = '';
  news: NewsWithCategory[] = [];
  categoryNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private newsService: NewsService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.category = params['category'];
      this.loadNews();
    });
  }

  private loadNews() {
    if (!this.category) {
      this.categoryNotFound = true;
      return;
    }

    const categoryId = this.categoryService.getCategoryId(this.category);

    if (categoryId) {
      this.news = this.newsService.getNewsByCategory(categoryId);
      this.categoryNotFound = false;
    } else {
      this.categoryNotFound = true;
      this.news = [];
    }
  }
}
