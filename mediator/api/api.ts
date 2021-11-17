import { config } from "@constants/config";
import { ApiInterface } from "types/api";
import { Article } from "types/article";
import { User } from "types/user";

const url = config.url.API_URL;
export class Api implements ApiInterface {
  async getUserByEmail(email: string) {
    let getUrl = `${url}/user/email`;
    let getObject = {
      method: "GET",
      headers: {
        body: email,
      },
    };
    const user: User = await fetch(getUrl, getObject).then((res) => res.json());
    return user;
  }

  async updateUserProfile(userProfileData: User) {
    let postUrl = `${url}/user/update`;
    let postObject = {
      method: "POST",
      body: JSON.stringify(userProfileData),
    };

    const completedUser = await fetch(postUrl, postObject).then((res) =>
      res.json()
    );
    return completedUser;
  }

  async publishArticle(article: Article, userEmail: User["email"]) {
    let postUrl = `${url}/article/${article.url}`;
    let postObject = {
      method: "POST",
      body: JSON.stringify({
        article,
        userEmail,
      }),
    };

    const publishedArticle = await fetch(postUrl, postObject);

    return publishedArticle;
  }

  async getFeaturedArticle() {
    let getUrl = `${url}/article/getFeaturedArticle`;
    const featuredArticle = await fetch(getUrl).then((res) => res.json());

    return featuredArticle;
  }
}
