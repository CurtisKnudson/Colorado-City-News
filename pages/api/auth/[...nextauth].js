import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "@database/mongodb";
import { ObjectId } from "mongodb";

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
    theme: "auto",
    debug: true,
  });
}
