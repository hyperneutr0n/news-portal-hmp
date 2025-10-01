import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NewsList, NewsService } from '@services/news.service';
import { ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-news-search',
  templateUrl: './news-search.component.html',
  styleUrls: ['./news-search.component.scss'],
  standalone: false,
})
export class NewsSearchComponent implements OnInit {
  @ViewChild(IonSearchbar) searchbar!: IonSearchbar;
  newsResults: NewsList[] = [];
  private searchQuery$ = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private newsService: NewsService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const query = params['q'] || '';
      if (this.searchbar) {
        this.searchbar.value = query;
      }
      this.newsResults = this.newsService.searchNews(query);
    });

    this.searchQuery$.pipe(debounceTime(300)).subscribe((query) => {
      this.updateUrlAndSearch(query);
    });
  }

  onSearchChange(event: any) {
    const query = event.detail.value;
    this.searchQuery$.next(query);
  }

  private updateUrlAndSearch(query: string) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query || null },
      queryParamsHandling: 'merge',
    });

    this.newsResults = this.newsService.searchNews(query);
  }

  readNews(id: number) {
    this.router.navigate(['/portal/news', id]);
  }
}
