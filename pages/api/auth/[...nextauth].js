import NextAuth from "next-auth";
import { connectToDatabase } from "@utils/mongodb";

const { db } = await connectToDatabase();
export default NextAuth({
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
  adapter: MongoDBAdaper({
    db: db,
  }),
  session: {
    jwt: true,
  },
  theme: "auto",
  debug: true,
});
