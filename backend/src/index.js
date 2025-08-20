import express from 'express';
import {connectdb }from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
const app=express();

dotenv.config();
app.use(express.json())// to parse json data(req.body)
app.use(cookieParser())// to parse cookies

app.use(cors({
   origin: "http://localhost:5173",
    credentials:true,//to allow cookies to be sent with requests
}));

app.use("/api/auth",router)
const Port=process.env.PORT
const __dirname=path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "../frontend/STORE/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join("../frotend/STORE","dist", 'index.html'));
    });
}

app.listen(Port,()=>{
    connectdb();
    console.log("Server is running on port 5000");
})