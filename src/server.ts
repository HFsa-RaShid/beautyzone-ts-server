import dotenv from "dotenv";
dotenv.config(); 

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/index.js'; 
import { connectDB } from './config/db.js';
import { ProductRoutes } from "./modules/product/product.routes.js";
import { ReviewRoutes } from "./modules/review/review.routes.js";
import { PaymentRoutes } from "./modules/payment/payment.routes.js";
import { AuthRoutes } from "./modules/auth/auth.routes.js";




const app: Application = express();
const PORT = config.port || 5001;

// --- Middleware ---
app.use(
  cors({
    origin: [
    //   "https://beautyzone-next-client.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/products", ProductRoutes);
app.use("/api", ReviewRoutes);
app.use("/api/payment", PaymentRoutes);
app.use("/api/auth", AuthRoutes);

// --- Database & Server Start ---
const startServer = async () => {
  try {

    await connectDB(); 
    
    // app.listen(PORT, () => {
    //   console.log(`🚀 Server is running on http://localhost:${PORT}`);
    // });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// --- Routes ---
app.get("/", (req: Request, res: Response) => {
  res.send("Beauty Zone API is running with TypeScript...");
});



export default app;