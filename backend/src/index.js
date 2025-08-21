import express from 'express';
import { connectdb } from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();
const Port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json()); // to parse json data(req.body)
app.use(cookieParser()); // to parse cookies

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://Store.onrender.com"
  ],
  credentials: true,
}));

app.use("/api/auth", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/STORE/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/STORE/dist", "index.html"));
  });
}

app.listen(Port, () => {
  connectdb();
  console.log(`Server is running on port ${Port}`);
});
