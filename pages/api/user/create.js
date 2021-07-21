import nextConnect from "next-connect";
import auth from "middleware/auth";
import { createUser, findUserByEmail } from "@lib/db";

const handler = nextConnect();

handler

  .use(auth)

  .post(async (req, res) => {
    const { password, firstName, email, lastName } = req.body;
    if (!password || !firstName || !lastName || !email) {
      return res.status(400).send("Missing fields");
    }

    // Check if the Email has already been used
    const userExists = !!(await findUserByEmail(email));
    if (userExists) {
      return res.status(409).send("A user already exists with this Email");
    }

    createUser(req.body);

    req.logIn(user, (err) => {
      if (err) throw err;
      // Log the signed up user in
      res.status(201).json(req.body);
    });
  });

export default handler;
