import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;

  if (req.method === "GET") {
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

      const featuredArticle = data[0].publishedArticles.sort(function (
        a: any,
        b: any
      ) {
        a = a.date.split("/").reverse().join("");
        b = b.date.split("/").reverse().join("");
        return a > b ? -1 : a < b ? 1 : 0;
      });

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
    let { article, userEmail } = JSON.parse(req.body);
    let filter = {
      email: userEmail,
    };

    const databaseArticle = {
      $push: {
        publishedArticles: article,
      },
    };

    let publishedArticle = await db
      .collection("users")
      .findOneAndUpdate(filter, databaseArticle, { returnDocument: "after" })
      .then((res: any) => {
        res;
      })
      .catch((err: string) => {
        throw new Error(err);
      });

    res.json(publishedArticle);
  }
};
