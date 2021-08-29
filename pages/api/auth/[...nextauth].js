import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Email({
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
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
  },
  theme: "auto",
  debug: true,
});
