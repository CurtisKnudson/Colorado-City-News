export interface Article {
  id: string;
  author: string;
  authorId: string;
  date: Date | string;
  title: string;
  subTitle: string;
  image: string;
  readTime: string;
  tags?: string[];
  content: any;
  url: string;
}

export interface ArticleComment {
  article: Article;
  id: string;
  date: Date | string;
  comment: string;
  authorId: string;
  authorEmail: string;
  authorName: string;
  authorImage: string;
  authorProfileUrl: string;
  voteCountObject: {
    count: number;
    usersWhoVoted: string[];
  };
}
