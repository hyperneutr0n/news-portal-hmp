import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@services/category.service';
import { NewsService, NewsList } from '@services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss'],
  standalone: false,
})
export class NewsListComponent implements OnInit {
  category: string = '';
  news: NewsList[] = [];
  categoryNotFound: boolean = false;

  constructor(
    private router: Router,
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
      this.news = this.newsService.getNewsList(categoryId);
      this.categoryNotFound = false;
    } else {
      this.categoryNotFound = true;
      this.news = [];
    }
  }

  readNews(id: number) {
    this.router.navigate(['/portal/news-detail', id]);
  }
}
