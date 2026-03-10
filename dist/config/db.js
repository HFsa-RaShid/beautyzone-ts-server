"use strict";
// import { MongoClient, Db } from "mongodb";
// import config from ".";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
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
const mongoose_1 = __importDefault(require("mongoose"));
const index_js_1 = __importDefault(require("./index.js"));
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(index_js_1.default.mongo_db_url);
        console.log("✅ Mongoose Connected Successfully");
    }
    catch (error) {
        console.error("❌ Mongoose Connection Failed:", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
