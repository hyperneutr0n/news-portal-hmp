import { Injectable } from '@angular/core';
import { Comment } from '@models/comments.model';
import { comments } from '@data/comment.data';
import { UserService } from '@services/user.service';
import { StorageService } from '@services/storage.service';

export interface DisplayComment extends Comment {
  username: string;
  replies: DisplayComment[];
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private comments: Comment[] = [];

  constructor(
    private userService: UserService,
    private storageService: StorageService,
  ) {
    this.loadComments();
  }

  private loadComments(): void {
    this.comments = this.storageService.getItem('comments');
    if (!this.comments) {
      this.comments = comments;
      this.storageService.setItem('comments', comments);
    }
  }

  getCommentForNews(newsId: number): DisplayComment[] {
    const filteredComments = this.comments.filter(
      (comment) => comment.newsId === newsId,
    );

    return this.transformToNestedComments(filteredComments);
  }

  private transformToNestedComments(comments: Comment[]): DisplayComment[] {
    const commentMap: { [key: number]: DisplayComment } = {};

    comments.forEach((comment) => {
      const user = this.userService.getUsername(comment.userId);
      commentMap[comment.id] = {
        ...comment,
        username: user?.username || 'Unknown',
        replies: [],
      };
    });

    const nestedComments: DisplayComment[] = [];
    for (const commentId in commentMap) {
      const comment = commentMap[commentId];
      if (comment.parentCommentId && commentMap[comment.parentCommentId]) {
        commentMap[comment.parentCommentId].replies.push(comment);
      } else {
        nestedComments.push(comment);
      }
    }
    return nestedComments;
  }

  createNewComment(comment: Comment): void {
    this.comments.push(comment);
    this.storageService.setItem('comments', this.comments);
  }
}
