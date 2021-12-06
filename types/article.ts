export interface Article {
  id: string;
  author: string;
  date: Date | string;
  title: string;
  subTitle: string;
  image: string;
  readTime: string;
  content: any;
  url: string;
}

export interface ArticleComment {
  article: Article;
  id: string;
  date: Date;
  comment: string;
  authorId: string;
  authorEmail: string;
  authorName: string;
  authorImage: string;
}
