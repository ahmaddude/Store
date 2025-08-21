import express from 'express';
import { connectdb } from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

dotenv.config();
const __dirname = path.resolve();
const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

// Fix CORS for production
const corsOptions = {
  origin: process.env.NODE_ENV === "production" 
    ? [process.env.FRONTEND_URL, "https://your-render-app.onrender.com"] // Replace with your actual Render URL
    : "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// API routes
app.use("/api/auth", router);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "frontend", "dist");
  
  console.log("Production mode enabled");
  console.log("Static path:", staticPath);
  console.log("Directory exists:", fs.existsSync(staticPath));
  
  if (fs.existsSync(staticPath)) {
    console.log("Files in dist:", fs.readdirSync(staticPath));
    app.use(express.static(staticPath));
    
    app.get(/^(?!\/api).*/, (req, res) => {
      const indexPath = path.join(staticPath, "index.html");
      console.log(`Serving ${req.path} -> index.html`);
      console.log("Index path:", indexPath);
      console.log("Index exists:", fs.existsSync(indexPath));
      
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        console.error("index.html not found!");
        res.status(404).send("Frontend build files not found");
      }
    });
  } else {
    console.error("Frontend dist directory not found!");
    app.get("*", (req, res) => {
      res.status(404).json({
        error: "Frontend not built",
        message: "Run 'npm run build' to build the frontend",
        path: staticPath
      });
    });
  }
} else {
  // Development mode
  app.get("/", (req, res) => {
    res.json({ message: "API is running in development mode" });
  });
}

app.listen(Port, () => {
  connectdb();
  console.log(`Server is running on port ${Port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});