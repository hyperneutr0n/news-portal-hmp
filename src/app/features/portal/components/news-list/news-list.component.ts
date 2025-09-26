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
      this.router.navigateByUrl('home');
      return;
    }

    const categoryId = this.categoryService.getCategoryId(this.category);

    if (categoryId) {
      this.news = this.newsService.getNewsList(categoryId);
    } else {
      this.router.navigateByUrl('home');
      return;
    }
  }

  readNews(id: number) {
    this.router.navigate(['/portal/news', id]);
  }
}
