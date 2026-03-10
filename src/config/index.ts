import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const encodedPass = encodeURIComponent(process.env.DB_PASS as string);

const config = {
  port: process.env.PORT || 5001,
  mongo_db_url: `mongodb+srv://${process.env.DB_USER}:${encodedPass}@cluster0.g65hyqn.mongodb.net/beautyzone?retryWrites=true&w=majority`,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  ssl: {
    store_id: process.env.SSL_STORE_ID,
    store_pass: process.env.SSL_STORE_PASS,
    is_live: process.env.SSL_IS_LIVE === 'true',
  },
  api_url: process.env.API_URL,
};

export default config;