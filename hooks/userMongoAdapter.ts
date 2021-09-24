import { connectToDatabase } from "@database/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { ObjectId } from "mongodb";
const mongoAdapter = async () => {
  const { db } = await connectToDatabase();
  return MongoDBAdapter({
    db: () => {
      return db;
    },
    ObjectId: ObjectId,
  });
};

export const useMongoAdapter = mongoAdapter();
