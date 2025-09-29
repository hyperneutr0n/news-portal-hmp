import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '@models/comments.model';
import { DisplayComment } from '@services/comment.service';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
  standalone: false,
})
export class CommentItemComponent implements OnInit {
  @Input() comment!: DisplayComment;
  @Output() replyClicked = new EventEmitter<DisplayComment>();

  showReplies = false;

  constructor() {}

  ngOnInit() {}

  toggleReplies() {
    this.showReplies = !this.showReplies;
  }

  onReply() {
    this.replyClicked.emit(this.comment);
  }
}
