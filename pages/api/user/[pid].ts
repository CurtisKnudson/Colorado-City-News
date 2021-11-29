import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;
  if (typeof pid === "string") {
    if (req.method === "GET") {
      let user = await db
        .collection("users")
        .findOne({ [pid]: req.headers.body });

      res.json(user);
      return;
    }
    if (req.method === "POST") {
      if (pid === "addProfileUrl") {
        const { email, profileUrl } = JSON.parse(req.body);
        res.json({ test: "ive been hit", email, profileUrl });
      }
      if (pid === "update") {
        const { email, name, image } = JSON.parse(req.body);
        const filter = {
          email: email,
        };

        let dbImage = image;

        if (image.includes("base64")) {
          let stringifiedImage = JSON.stringify(image.split(",")[1]);

          let headersList = {
            Accept: "*/*",
            Authorization: "Client-ID 1a01fef28b385f9",
          };

          dbImage = await fetch("https://api.imgur.com/3/image", {
            method: "POST",
            body: stringifiedImage,
            headers: headersList,
          })
            .then(function (response) {
              return response.json();
            })
            .then(function (jsonified) {
              return jsonified.data.link;
            });
        }

        const updateDocument = {
          $set: {
            name: name,
            image: dbImage,
          },
        };
        let user = await db
          .collection("users")
          .findOneAndUpdate(filter, updateDocument, { returnDocument: "after" })
          .then((res: any) => res);

        res.json(user.value);
        return;
      }
      return;
    }
  }
};
