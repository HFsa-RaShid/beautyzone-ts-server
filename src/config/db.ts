// import { MongoClient, Db } from "mongodb";
// import config from ".";


// const client = new MongoClient(config.mongo_db_url as string);

// let db: Db; 

// export const connectDB = async (): Promise<void> => {
//   try {
//     await client.connect();
//     console.log("✅ MongoDB Connected Successfully");
//     // Prefer DB name from connection string (e.g. "...mongodb.net/beautyzone")
//     // If not present, MongoDB driver falls back to "test".
//     db = client.db();
//   } catch (error: any) {
//     console.error("❌ MongoDB Connection Failed:", error.message);

//   }
// };

// export const getDB = (): Db => {
//   if (!db) {
//     throw new Error("Database not initialized. Call connectDB first.");
//   }
//   return db;
// };

import mongoose from 'mongoose';
import config from './index.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongo_db_url as string);
    console.log("✅ Mongoose Connected Successfully");
  } catch (error) {
    console.error("❌ Mongoose Connection Failed:", error);
    process.exit(1);
  }
};