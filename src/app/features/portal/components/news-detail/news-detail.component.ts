import { IonicSlides } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { Comment } from '@models/comments.model';
import { Rating } from '@models/rating.model';
import { NewsContent, NewsService } from '@services/news.service';
import { DisplayComment, CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';
import { RatingService } from '@services/rating.service';

register();

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  standalone: false,
})
export class NewsDetailComponent implements OnInit {
  swiperModules = [IonicSlides];

  news: NewsContent = {} as NewsContent;
  newsId: number = 0;
  comments: DisplayComment[] = [];
  newCommentText: string = '';
  replyingTo: DisplayComment | null = null;
  isCommentsModalOpen: boolean = false;

  userRating: number = 0;
  ratingStars: number[] = [1, 2, 3, 4, 5];
  ratingMode: 'post' | 'update' = 'post';

  private currentUser!: number;

  @ViewChild('swiper') swiper!: ElementRef<any>;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private commentService: CommentService,
    private authService: AuthService,
    private ratingService: RatingService,
  ) {}

  ngAfterViewInit() {
    const swiperParams = {
      slidesPerView: 1,
      pagination: { clickable: true },
      loop: true,
    };
    Object.assign(this.swiper.nativeElement, swiperParams);
    this.swiper.nativeElement.initialize();
  }

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser()?.id;
    if (!currentUser) {
      return;
    }
    this.currentUser = currentUser;

    this.route.params.subscribe((params) => {
      this.newsId = parseInt(params['id']);

      this.news = this.newsService.getNewsContent(this.newsId);
      this.loadComments(this.newsId);
      this.loadRating(this.newsId);
    });
  }

  private loadComments(newsId: number) {
    this.comments = this.commentService.getCommentForNews(newsId);
  }

  private loadRating(newsId: number) {
    const rating = this.ratingService.getRatingForNewsByUser(
      this.currentUser,
      newsId,
    );
    if (rating) {
      this.ratingMode = 'update';
      this.userRating = rating;
    }
  }

  goBack() {
    this.location.back();
  }

  handleReply(comment: DisplayComment) {
    this.replyingTo = comment;
    document.getElementById('txtComment')?.focus();
  }

  cancelReply() {
    this.replyingTo = null;
  }

  openCommentsModal() {
    this.isCommentsModalOpen = true;
    document.getElementById('txtComment')?.focus();
  }

  closeCommentsModal() {
    this.isCommentsModalOpen = false;
    this.replyingTo = null;
  }

  onModalDismiss() {
    this.isCommentsModalOpen = false;
    this.replyingTo = null;
  }

  onStarClick(rating: number) {
    this.userRating = rating;
    this.postRating();
  }

  private postRating() {
    const newRating: Rating = {
      userId: this.currentUser,
      newsId: this.newsId,
      score: this.userRating,
    };
    switch (this.ratingMode) {
      case 'post':
        this.ratingService.createNewRating(newRating);
        break;
      case 'update':
        this.ratingService.updateRating(newRating);
        break;
    }
  }

  postComment() {
    if (!this.newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      userId: this.currentUser,
      newsId: this.newsId,
      content: this.newCommentText,
      parentCommentId: this.replyingTo ? this.replyingTo.id : undefined,
    };

    if (this.replyingTo) {
      newComment.content = `@${this.replyingTo.username} ${newComment.content}`;
    }

    this.commentService.createNewComment(newComment);
    this.newCommentText = '';
    this.loadComments(this.newsId);
  }
}
