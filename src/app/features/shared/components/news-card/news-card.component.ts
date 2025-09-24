import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss'],
  standalone: false,
})
export class NewsCardComponent implements OnInit {
  @Input() title: string = '';
  @Input() preview: string = '';  
  @Input() categories: string[] = [];

  constructor() {}

  ngOnInit() {}
}
