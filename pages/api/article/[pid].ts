import { Article, ArticleComment } from "types/article";
import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;

  if (req.method === "GET") {
    if (pid === "getArticleCommentsByArticleId") {
      const getArticleCommentsQuery = {
        id: req.headers.body,
      };
      const articleCommentsOptions = {
        projection: {
          _id: 0,
          comments: 1,
        },
      };
      const article = await db
        .collection("articles")
        .findOne(getArticleCommentsQuery, articleCommentsOptions);

      if (Object.keys(article).length === 0) {
        res.status(204).json({
          message: "No Comments found for this article",
        });
        return;
      }
      res.json(article.comments);
      return;
    }

    if (pid === "getAllArticles") {
      let articles: Article[] = await db
        .collection("articles")
        .find()
        .toArray();

      res.status(200).send(articles);

      return;
    }

    const query = { "publishedArticles.url": pid };
    const options = {
      projection: {
        _id: 0,
        publishedArticles: { $elemMatch: { url: pid } },
        name: 1,
        image: 1,
        profileUrl: 1,
      },
    };
    let article = await db
      .collection("users")
      .findOne(query, options)
      .then((res: any) => {
        return res;
      });
    res.json(article);
    return;
  }

  if (req.method === "POST") {
    if (pid === "addCommentToArticle") {
      const comment: ArticleComment = JSON.parse(req.body);

      const addCommentToArticleQuery = {
        id: comment.article.id,
      };
      const databaseComment = {
        $push: {
          comments: comment,
        },
      };

      const request = await db
        .collection("articles")
        .findOneAndUpdate(addCommentToArticleQuery, databaseComment);

      const addArticleCommentToUserQuery = {
        email: comment.authorEmail,
      };
      const databaseUserComment = {
        $push: {
          comments: comment,
        },
      };

      await db
        .collection("users")
        .findOneAndUpdate(addArticleCommentToUserQuery, databaseUserComment);

      res.json(request);
      return;
    }

    // Logic for publishing a new article
    const { article }: { article: Article } = JSON.parse(req.body);
    const publishArticleByUserId = {
      email: article.authorId,
    };

    const databaseArticle = {
      $push: {
        publishedArticles: article,
      },
    };

    await db.collection("articles").insertOne(article);

    let publishedArticle = await db
      .collection("users")
      .findOneAndUpdate(publishArticleByUserId, databaseArticle, {
        returnDocument: "after",
      })
      .then((res: any) => {
        res;
      })
      .catch((err: string) => {
        throw new Error(err);
      });

    res.json(publishedArticle);
    return;
  }
};
