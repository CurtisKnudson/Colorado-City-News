/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN_SECRET: string;
      // Mongo
      MONGODB_URI: string;
      MONGODB_DB: string;
      // Magic
      MAGIC_SECRET_KEY: string;
      MAGIC_PUBLISHABLE_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
