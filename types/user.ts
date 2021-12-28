export interface User {
  _id: string;
  id?: string;
  name: string;
  email: string;
  image: string;
  createdAt?: string;
  emailVerified?: string;
  publishedArticles?: any[];
  profileUrl: string;
  userId: string;
  isAdmin: boolean;
  isWriter: boolean;
}

export interface NonUserProfile {
  name: string;
  image: string;
  profileUrl: string;
  publishedArticles?: any[];
  // TODO: Make so that this represents the typescritp for an actual comment when that is properly defined
  comments?: any;
  status?: string;
  message?: string;
}
