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
  articleId: string;
  id: string;
  date: Date;
  author: string;
  comment: string;
  image: string;
}
