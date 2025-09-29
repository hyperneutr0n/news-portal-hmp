import { Injectable } from '@angular/core';
import { Comment } from '@models/comments.model';
import { comments } from '@data/comment.data';
import { UserService } from '@services/user.service';

export interface DisplayComment extends Comment {
  username: string;
  replies: DisplayComment[]
}

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private userService: UserService) {}

  getCommentForNews(newsId: number): DisplayComment[] {
    const filteredComments = comments.filter((comment) => comment.newsId === newsId);
    
    return this.transformToNestedComments(filteredComments);
  }

  private transformToNestedComments(comments: Comment[]): DisplayComment[] {
    const commentMap: { [key: number]: DisplayComment } = {};

    comments.forEach(comment => {
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
}
