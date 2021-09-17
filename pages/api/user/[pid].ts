import { connectToDatabase } from "database/mongodb";
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
    if (typeof pid === "string" && pid === "update") {
      const { email, name, image } = JSON.parse(req.body);
      const filter = {
        email: email,
      };
      const updateDocument = {
        $set: {
          name: name,
          image: image,
        },
      };
      let user = await db
        .collection("users")
        .findOneAndUpdate(filter, updateDocument, { returnDocument: "after" })
        .then((res: any) => res);

      res.json(user.value);
    }
  }
};
