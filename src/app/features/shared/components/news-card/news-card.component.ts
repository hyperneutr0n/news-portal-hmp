import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: false,
})
export class NewsCardComponent implements OnInit {
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() categories: string[] = [];
  @Input() rating: number = 1.2;

  constructor() {}

  ngOnInit() {}
}
