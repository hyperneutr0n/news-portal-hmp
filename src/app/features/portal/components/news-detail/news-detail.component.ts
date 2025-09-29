import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { NewsContent, NewsService } from '@services/news.service';
import { Comment } from '@models/comments.model';
import { DisplayComment, CommentService } from '@services/comment.service';
import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';
import { RatingService } from '@services/rating.service';

register();

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss'],
  standalone: false,
})
export class NewsDetailComponent implements OnInit {
  news: NewsContent = {} as NewsContent;
  newsId: number = 0;
  comments: DisplayComment[] = [];
  newCommentText: string = '';
  replyingTo: DisplayComment | null = null;
  isCommentsModalOpen: boolean = false;

  // Rating properties
  userRating: number = 0;
  ratingStars: number[] = [1, 2, 3, 4, 5];

  private currentUser!: number;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private commentService: CommentService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser()?.id;
    if (!currentUser) {
      return;
    }
    this.currentUser = currentUser;

    const newsId = this.route.snapshot.paramMap.get('id');
    if (!newsId) {
      return;
    }
    this.newsId = parseInt(newsId);
    this.news = this.newsService.getNewsContent(this.newsId);
    this.comments = this.commentService.getCommentForNews(this.newsId);
    console.log(this.comments);
  }

  goBack() {
    this.location.back();
  }

  handleReply(comment: DisplayComment) {
    this.replyingTo = comment;
    document.getElementById("txtComment")?.focus();
  }

  cancelReply() {
    this.replyingTo = null;
  }

  openCommentsModal() {
    this.isCommentsModalOpen = true;
    document.getElementById("txtComment")?.focus();
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
  }

  clearRating() {
    this.userRating = 0;
  }

  postComment() {
    if (!this.newCommentText.trim()) return;

    const user = this.userService.getUsername(this.currentUser);

    if (!user) return;

    const newComment: Comment = {
      id: Date.now(),
      userId: this.currentUser,
      newsId: this.newsId,
      content: this.newCommentText,
      parentCommentId: this.replyingTo ? this.replyingTo.id : undefined,
    };

    if (this.replyingTo) {
      newComment.content = `@${this.replyingTo.username} ${newComment.content}`
    }

    const newDisplayComment: DisplayComment = {
      ...newComment,
      username: user.username,
      replies: [],
    };

    if (this.replyingTo) {
      this.replyingTo.replies.push(newDisplayComment);
      this.replyingTo = null;
    } else {
      this.comments.push(newDisplayComment);
    }
    this.newCommentText = '';
  }
}
