export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt?: string;
  emailVerified?: string;
  publishedArticles?: any[];
  profileUrl?: string;
}
