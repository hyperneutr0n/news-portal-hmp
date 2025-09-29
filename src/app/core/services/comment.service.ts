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
    
    return this.transformToNestedComments(comments);
  }

  private transformToNestedComments(comments: Comment[]): DisplayComment[] {
    const commentMap: { [key: number]: DisplayComment } = {};

    // First, map all comments to DisplayComment and add user details
    comments.forEach(comment => {
      const user = this.userService.getUsername(comment.userId);
      commentMap[comment.id] = {
        ...comment,
        username: user?.username || 'Unknown',
        replies: [], // Initialize replies array
      };
    });

    const nestedComments: DisplayComment[] = [];
    // Second, link replies to their parents
    for (const commentId in commentMap) {
      const comment = commentMap[commentId];
      if (comment.parentCommentId && commentMap[comment.parentCommentId]) {
        commentMap[comment.parentCommentId].replies.push(comment);
      } else {
        nestedComments.push(comment); // This is a top-level comment
      }
    }
    return nestedComments;
  }
}
