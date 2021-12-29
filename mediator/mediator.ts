import { ApiInterface } from "types/api";
import { Article, ArticleComment } from "types/article";
import { MediatorInterface } from "types/mediator/mediator";
import { NonUserProfile, User } from "types/user";
import { ObservableValue } from "./observables";
import { NOTFOUND } from "constants/authentication";
import { ProfileUrlValidation } from "@components/profile/userInfo";

export class Mediator implements MediatorInterface {
  private api: ApiInterface;

  featuredArticle = new ObservableValue<Article | null>(null);
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

  async getAllArticles() {
    const request: Article[] = await this.api.getAllArticles();

    const sortedRequest = request.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    this.featuredArticle.setValue(sortedRequest[0]);

    return sortedRequest;
  }

  async doesArticleUrlExist(url: string) {
    const request = await this.api.doesArticleUrlExist(url);
    if (request.message === "Article already exists") {
      return true;
    }
    return false;
  }

  async publishArticle(article: Article) {
    if (!article) {
      throw new Error("Article is required");
    }
    if (!article.title) {
      throw new Error("A title is required to submit an article");
    }
    if (!article.content) {
      throw new Error("You must write content to publish an article");
    }
    if (!article.tags) {
      throw new Error("You must add at least one tag to publish an article");
    }
    if (await this.doesArticleUrlExist(article.url)) {
      throw new Error("An Article with that Title already exists");
    }
    return await this.api.publishArticle(article);
  }

  async getArticleCommentsByArticleId(articleId: string) {
    await this.api.getArticleCommentsByArticleId(articleId).then((res) => {
      this.articleComments.setValue(res);
    });
  }

  async addCommentToArticle(comment: ArticleComment) {
    return await this.api.addCommentToArticle(comment).then(() => {
      this.getArticleCommentsByArticleId(comment.article.id);
    });
  }

  async validateProfileUrl(profileUrl: string) {
    return this.api.validateProfileUrl(profileUrl).then((res) => {
      if (res.message === "User not found") {
        return ProfileUrlValidation.VALID;
      }
      return ProfileUrlValidation.INVALID;
    });
  }

  dispose() {
    this.featuredArticle.dispose();
    this.articleComments.dispose();
    this.nonUserProfile.dispose();
  }
}
