import { Article, ArticleComment } from "types/article";
import { User } from "types/user";

export interface ApiInterface {
  getUserByEmail(email: string): Promise<User>;
  updateUserProfile(userProfileData: User): Promise<User>;
  publishArticle(article: Article, userEmail: User["email"]): Promise<any>;
  getFeaturedArticle(): Promise<any>;
  getArticleCommentsByArticleId(
    articleId: string
  ): Promise<ArticleComment[] | null | undefined>;
  addCommentToArticle(comment: ArticleComment): Promise<any>;
  addProfileUrl(email: string, profileUrl: string): Promise<User>;
}
