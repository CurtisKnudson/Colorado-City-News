import { connectToDatabase } from "@utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  if (req.method === "POST") {
    await db.collection("users").insertOne(JSON.parse(req.body));
    return res.json(req.body);
  }
  if (req.method === "GET") {
    const articles = await db.collection("users").find({}).toArray();

    res.json(articles);
  }
};
