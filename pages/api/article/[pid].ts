import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  // const { pid } = req.query;

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
        console.log(res);
        res;
      })
      .catch((err: string) => {
        throw new Error(err);
      });

    res.json(publishedArticle);
  }
};
