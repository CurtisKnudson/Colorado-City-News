import { connectToDatabase } from "@utils/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;

  if (req.method === "GET") {
    if (typeof pid === "string") {
      let user = await db
        .collection("users")
        .findOne({ [pid]: req.headers.body });
      res.json(user);
    }
  }
  if (req.method === "POST") {
    res.json(req.body);
  }
};
