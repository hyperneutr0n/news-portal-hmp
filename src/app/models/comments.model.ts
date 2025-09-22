export interface Comment {
  id: number;
  content: string;
  userId: number;
  newsId: number;
  parentCommentId?: number;
}
