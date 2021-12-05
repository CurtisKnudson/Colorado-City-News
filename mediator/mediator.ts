import { ApiInterface } from "types/api";
import { Article, ArticleComment } from "types/article";
import { MediatorInterface } from "types/mediator/mediator";
import { NonUserProfile, User } from "types/user";
import { ObservableValue } from "./observables";
import { NOTFOUND } from "constants/authentication";

export class Mediator implements MediatorInterface {
  private api: ApiInterface;

  featuredArticle = new ObservableValue(null);
  articleComments = new ObservableValue<ArticleComment[] | null | undefined>(
    null
  );
  nonUserProfile = new ObservableValue<
    NonUserProfile | null | undefined | string
  >(null);

  constructor(api: ApiInterface) {
    this.api = api;
  }

  async getUserByEmail(email: string) {
    const res = await this.api.getUserByEmail(email);
    return res;
  }

  async updateUserProfile(userProfileData: User) {
    const res: User = await this.api.updateUserProfile(userProfileData);
    return res;
  }

  async addProfileUrl(email: string, profileUrl: string) {
    const res: User = await this.api.addProfileUrl(email, profileUrl);

    return res;
  }

  async viewAnotherUserByProfileUrl(profileUrl: string) {
    await this.api
      .viewAnotherUserByProfileUrl(profileUrl)
      .then((res: NonUserProfile) => {
        if (res.status) {
          this.nonUserProfile.setValue({
            name: "",
            image: "",
            profileUrl: "",
            message: NOTFOUND,
          });
          return;
        }
        this.nonUserProfile.setValue(res);
      });
  }

  async publishArticle(article: Article, userEmail: User["email"]) {
    if (!article) {
      throw new Error("Article is required");
    }
    if (!userEmail) {
      throw new Error("User email is required");
    }
    return await this.api.publishArticle(article, userEmail);
  }

  async getFeaturedArticle() {
    const res = await this.api.getFeaturedArticle();
    this.featuredArticle.setValue(res);
    return res;
  }

  async getArticleCommentsByArticleId(articleId: string) {
    await this.api.getArticleCommentsByArticleId(articleId).then((res) => {
      this.articleComments.setValue(res);
    });
  }

  async addCommentToArticle(comment: ArticleComment) {
    return await this.api.addCommentToArticle(comment).then(() => {
      this.getArticleCommentsByArticleId(comment.articleId);
    });
  }

  dispose() {
    this.featuredArticle.dispose();
  }
}
