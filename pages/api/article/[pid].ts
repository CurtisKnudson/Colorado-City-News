import { ArticleComment } from "types/article";
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

      if (!article) {
        res.status(204).json({
          message: "No Comments found for this article",
        });
      }
      res.json(article.comments);
      return;
    }
    if (pid === "getFeaturedArticle") {
      const query = { publishedArticles: { $exists: true } };
      const options = {
        projection: {
          _id: 0,
          publishedArticles: 1,
          name: 1,
          image: 1,
        },
        sort: { "publishedArticles.date": 1 },
      };

      let data = await db.collection("users").find(query, options).toArray();

      // @ts-ignore

      const featuredArticle = data[0].publishedArticles.sort(
        (a: any, b: any) => {
          return Date.parse(b.date) - Date.parse(a.date);
        }
      );

      res.json({
        ...featuredArticle[0],
        authorImage: data[0].image,
      });

      return;
    }
    if (pid === "getAllArticles") {
      const query = { publishedArticles: { $exists: true } };
      const options = { projection: { _id: 0, "publishedArticles.url": 1 } };
      let articles = await db
        .collection("users")
        .find(query, options)
        .toArray();

      const url = articles[0].publishedArticles.map((obj: any) => ({
        params: { id: obj.url },
      }));

      res.status(200).send(url);

      return;
    }

    const query = { "publishedArticles.url": pid };
    const options = {
      projection: {
        _id: 0,
        publishedArticles: { $elemMatch: { url: pid } },
        name: 1,
        image: 1,
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
        id: comment.articleId,
      };
      const databaseComment = {
        $push: {
          comments: comment,
        },
      };

      const request = await db
        .collection("articles")
        .findOneAndUpdate(addCommentToArticleQuery, databaseComment);

      res.json(request);
      return;
    }
    // TODO: Make so that duplicate URL strings are not allowed
    // Search for URL in database and throw error if it exists.
    const { article, userEmail } = JSON.parse(req.body);
    const publishArticleByEmailQuery = {
      email: userEmail,
    };

    const databaseArticle = {
      $push: {
        publishedArticles: article,
      },
    };

    await db.collection("articles").insertOne(article);

    let publishedArticle = await db
      .collection("users")
      .findOneAndUpdate(publishArticleByEmailQuery, databaseArticle, {
        returnDocument: "after",
      })
      .then((res: any) => {
        res;
      })
      .catch((err: string) => {
        throw new Error(err);
      });

    res.json(publishedArticle);
  }
};
