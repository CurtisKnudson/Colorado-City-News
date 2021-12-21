import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const UserApi = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;
  if (typeof pid === "string") {
    if (req.method === "GET") {
      if (pid === "validateProfileUrl") {
        const profileUrl = req.headers.body;
        const filter = {
          profileUrl,
        };

        const user = await db
          .collection("users")
          .findOne(filter)
          .then((res: any) => {
            if (!res) {
              return {
                status: 204,
                message: "User not found",
              };
            }
            return res;
          });

        console.log(user);

        res.json(user);
        return;
      }
      if (pid === "viewAnotherUserByProfileUrl") {
        const filter = {
          profileUrl: req.headers.body,
        };
        const options = {
          projection: {
            _id: 0,
            name: 1,
            image: 1,
            profileUrl: 1,
            comments: 1,
            publishedArticles: 1,
          },
          sort: { "publishedArticles.date": 1 },
        };

        const user = await db
          .collection("users")
          .findOne(filter, options)
          .then((res: any) => {
            if (!res) {
              return {
                status: 204,
                message: "User not found",
              };
            }
            return res;
          });
        res.json(user);
        return;
      }

      let user = await db
        .collection("users")
        .findOne({ [pid]: req.headers.body });

      res.json(user);
      return;
    }
    if (req.method === "POST") {
      if (pid === "addProfileUrl") {
        const { email, profileUrl } = JSON.parse(req.body);
        const filter = {
          email,
        };
        const updateDocument = {
          $set: {
            profileUrl: profileUrl,
          },
        };
        let user = await db
          .collection("users")
          .findOneAndUpdate(filter, updateDocument, { returnDocument: "after" })
          .then((res: any) => res);

        res.json(user);
        return;
      }

      if (pid === "update") {
        const { email, name, image, profileUrl } = JSON.parse(req.body);
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
            profileUrl: profileUrl,
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

export default UserApi;
