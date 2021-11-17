import { MediatorStatus } from "types/mediator/status";
import { ApiInterface } from "types/api";
import { Article } from "types/article";
import { MediatorInterface } from "types/mediator/mediator";
import { User } from "types/user";
import { ObservableValue } from "./observables";

export class Mediator implements MediatorInterface {
  private api: ApiInterface;

  featuredArticle = new ObservableValue(null);

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

  dispose() {
    this.featuredArticle.dispose();
  }
}
