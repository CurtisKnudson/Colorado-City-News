import { config } from "@constants/config";
import { ApiInterface } from "types/api";
import { Article, ArticleComment } from "types/article";
import { NonUserProfile, User } from "types/user";

const url = config.url.API_URL;
export class Api implements ApiInterface {
  async getUserByEmail(email: string) {
    const getUrl = `${url}/user/email`;
    const getObject = {
      method: "GET",
      headers: {
        body: email,
      },
    };
    const user: User = await fetch(getUrl, getObject).then((res) => res.json());
    return user;
  }

  async updateUserProfile(userProfileData: User) {
    const postUrl = `${url}/user/updateUserProfile`;
    const postObject = {
      method: "POST",
      body: JSON.stringify(userProfileData),
    };

    return await fetch(postUrl, postObject).then((res) => res.json());
  }

  async addProfileUrl(email: string, profileUrl: string) {
    const postUrl = `${url}/user/addProfileUrl`;

    const postObject = {
      method: "POST",
      body: JSON.stringify({ email, profileUrl }),
    };

    return await fetch(postUrl, postObject).then((res) => res.json());
  }
  async viewAnotherUserByProfileUrl(profileUrl: string) {
    const getUrl = `${url}/user/viewAnotherUserByProfileUrl`;

    const getObject = {
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
    const postUrl = `${url}/article/${article.url}`;
    const postObject = {
      method: "POST",
      body: JSON.stringify({
        article,
      }),
    };

    return await fetch(postUrl, postObject);
  }

  async getArticleCommentsByArticleId(articleId: string) {
    const getUrl = `${url}/article/getArticleCommentsByArticleId`;

    const getObject = {
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
      return res.json();
    });

    return comments;
  }

  async addCommentToArticle(comment: ArticleComment) {
    const postUrl = `${url}/article/addCommentToArticle`;

    const postObject = {
      method: "POST",
      body: JSON.stringify(comment),
    };

    return await fetch(postUrl, postObject).then((res) => res);
  }

  async validateProfileUrl(profileUrl: string) {
    const getUrl = `${url}/user/validateProfileUrl`;
    const getObject = {
      method: "GET",
      headers: {
        body: profileUrl,
      },
    };

    return await fetch(getUrl, getObject).then((res) => res.json());
  }
}
