"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const index_js_1 = __importDefault(require("./config/index.js"));
const db_js_1 = require("./config/db.js");
const product_routes_js_1 = require("./modules/product/product.routes.js");
const review_routes_js_1 = require("./modules/review/review.routes.js");
const payment_routes_js_1 = require("./modules/payment/payment.routes.js");
const app = (0, express_1.default)();
const PORT = index_js_1.default.port || 5001;
// --- Middleware ---
app.use(
  (0, cors_1.default)({
    origin: [
      //   "https://beautyzone-next-client.vercel.app",
      "http://localhost:5173",
      "https://beautyzone-ts-client-ve1e.vercel.app",
    ],
    credentials: true,
  }),
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/products", product_routes_js_1.ProductRoutes);
app.use("/api", review_routes_js_1.ReviewRoutes);
app.use("/api/payment", payment_routes_js_1.PaymentRoutes);
// --- Database & Server Start ---
const startServer = async () => {
  try {
    await (0, db_js_1.connectDB)();
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};
startServer();
// --- Routes ---
app.get("/", (req, res) => {
  res.send("Beauty Zone API is running with TypeScript...");
});
exports.default = app;
