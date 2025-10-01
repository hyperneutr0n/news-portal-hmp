import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsList, NewsService } from '@services/news.service';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-news-favorites',
  templateUrl: './news-favorites.component.html',
  styleUrls: ['./news-favorites.component.scss'],
  standalone: false,
})
export class NewsFavoritesComponent implements OnInit {
  private currentUser!: number;
  favoriteNews: NewsList[] = [];

  constructor(
    private router: Router,
    private newsService: NewsService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    console.log('news favorites onInit');
    const currentUser = this.authService.getCurrentUser()?.id;
    if (!currentUser) {
      return;
    }
    this.currentUser = currentUser;
  }

  ionViewWillEnter() {
    this.loadFavoriteNews(this.currentUser);
  }

  private loadFavoriteNews(userId: number) {
    this.favoriteNews = this.newsService.getFavoriteNews(userId);
  }

  readNews(id: number) {
    this.router.navigate(['/portal/news', id]);
  }
}
