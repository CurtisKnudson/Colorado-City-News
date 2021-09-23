/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      MONGODB_DB: string;
      NEXTAUTH_URL: string;
      EMAIL_SERVER_HOST: string;
      EMAIL_SERVER_PORT: string;
      EMAIL_USER: string;
      EMAIL_PASS: string;
      EMAIL_FROM: string;
      NEXT_PUBLIC_IMGUR_CLIENT_ID: string;
      NEXT_PUBLIC_IMGUR_CLIENT_SECRET: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
