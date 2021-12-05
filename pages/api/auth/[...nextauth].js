import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "@database/mongodb";
import { ObjectId } from "mongodb";
import { makeId } from "@utils/makeId";

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
      async session({ session }) {
        const query = { email: session.user.email };
        const options = {
          projection: {
            profileUrl: 1,
          },
        };
        const dbUser = await db.collection("users").findOne(query, options);
        return {
          ...session,
          user: {
            ...session.user,
            profileUrl: dbUser.profileUrl,
            _id: dbUser._id,
          },
        };
      },
      async signIn({ user }) {
        if (!user.profileUrl) {
          const id = makeId();
          const filter = {
            email: user.email,
          };
          const updateDocument = {
            $set: {
              profileUrl: id,
            },
          };
          await db.collection("users").findOneAndUpdate(filter, updateDocument);
        }
        return true;
      },
    },
    theme: "auto",
    debug: true,
  });
}
