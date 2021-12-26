import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "@database/mongodb";
import { ObjectId } from "mongodb";
import { makeId } from "@utils/makeId";
import { v4 as uuidv4 } from "uuid";

export default async function auth(req, res) {
  let { db } = await connectToDatabase();
  return await NextAuth(req, res, {
    providers: [
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
    ],
    adapter: MongoDBAdapter({
      db: () => {
        return db;
      },
      ObjectId: ObjectId,
    }),
    session: {
      jwt: true,
    },
    callbacks: {
      async signIn({ user, email }) {
        const profileUrl = makeId();
        const userId = uuidv4();
        const query = {
          email: user.email,
        };
        const newUserSchema = {
          email: user.email,
          profileUrl,
          userId,
        };

        if (email.verificationRequest) {
          console.log("Verification request true");
          return true;
        }
        const userExists = await db.collection("users").findOne(query);

        if (userExists) {
          return true;
        }
        await db.collection("users").insertOne(newUserSchema);
        return true;
      },
      async session({ session }) {
        const query = { email: session.user.email };
        const options = {
          projection: {
            profileUrl: 1,
            userId: 1,
            name: 1,
            image: 1,
          },
        };
        const dbUser = await db.collection("users").findOne(query, options);
        return {
          ...session,
          user: {
            ...session.user,
            profileUrl: dbUser.profileUrl,
            userId: dbUser.userId,
            name: dbUser.name,
            image: dbUser.image,
          },
        };
      },
    },
    theme: "auto",
    debug: true,
  });
}
