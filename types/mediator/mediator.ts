import { ProfileUrlValidation } from "@components/profile/userInfo";
import { Article, ArticleComment } from "types/article";
import { User } from "types/user";

export interface MediatorInterface {
  featuredArticle: any;
  articleComments: any;
  nonUserProfile: any;
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
  publishArticle(article: Article): Promise<Article>;
  addCommentToArticle(comment: ArticleComment): Promise<any>;
  // TODO: Make sure that I make so this returns a comment in the promise
  getArticleCommentsByArticleId(articleId: string): Promise<any>;
  addProfileUrl(email: string, profileUrl: string): Promise<User>;
  viewAnotherUserByProfileUrl(profileUrl: string): void;
  getAllArticles(): Promise<Article[]>;
  validateProfileUrl(profileUrl: string): Promise<ProfileUrlValidation>;
}
