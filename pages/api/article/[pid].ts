import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;

  if (req.method === "GET") {
    if (pid === "getAllArticles") {
      const query = { publishedArticles: { $exists: true } };
      const options = { projection: { _id: 0, "publishedArticles.url": 1 } };
      let articles = await db
        .collection("users")
        .find(query, options)
        .toArray();

      const url = articles[0].publishedArticles.map((obj: any) => ({
        params: { slug: obj.url },
      }));

      res.json(url);

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
