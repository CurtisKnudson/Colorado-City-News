import { config } from "@constants/config";
import { delayWithValue } from "@utils/delayValue";
import { ApiInterface } from "types/api";
import { Article, ArticleComment } from "types/article";
import { NonUserProfile, User } from "types/user";

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

  async addProfileUrl(email: string, profileUrl: string) {
    const postUrl = `${url}/user/addProfileUrl`;

    let postObject = {
      method: "POST",
      body: JSON.stringify({ email, profileUrl }),
    };

    return await fetch(postUrl, postObject).then((res) => res.json());
  }
  async viewAnotherUserByProfileUrl(profileUrl: string) {
    const getUrl = `${url}/user/viewAnotherUserByProfileUrl`;

    let getObject = {
      method: "GET",
      headers: {
        body: profileUrl,
      },
    };

    const user: NonUserProfile = await fetch(getUrl, getObject).then((res) =>
      res.json()
    );
    return user;
  }

  async getAllArticles() {
    const getUrl = `${url}/article/getAllArticles`;
    const articles: Article[] = await fetch(getUrl).then((res) => res.json());

    return articles;
  }

  async publishArticle(article: Article) {
    let postUrl = `${url}/article/${article.url}`;
    let postObject = {
      method: "POST",
      body: JSON.stringify({
        article,
      }),
    };

    const publishedArticle = await fetch(postUrl, postObject);

    return publishedArticle;
  }

  async getArticleCommentsByArticleId(articleId: string) {
    const getUrl = `${url}/article/getArticleCommentsByArticleId`;

    let getObject = {
      method: "GET",
      headers: {
        body: articleId,
      },
    };

    const comments: ArticleComment[] | null | undefined = await fetch(
      getUrl,
      getObject
    ).then((res) => {
      if (res.status === 204) {
        return null;
      }
      const comments = res.json();
      return comments;
    });

    return comments;
  }

  async addCommentToArticle(comment: ArticleComment) {
    const postUrl = `${url}/article/addCommentToArticle`;

    let postObject = {
      method: "POST",
      body: JSON.stringify(comment),
    };

    const request = await fetch(postUrl, postObject).then((res) => res);
    return request;
  }

  validateProfileUrl(profileUrl: string) {
    return delayWithValue(false);
  }
}
