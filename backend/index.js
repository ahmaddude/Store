import express from 'express';
import {connectdb }from './db/connect.js';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app=express();

dotenv.config();
app.use(express.json())// to parse json data(req.body)
app.use(cookieParser())// to parse cookies

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,//to allow cookies to be sent with requests
}));

app.use("/api/auth",router)
const Port=process.env.PORT||5000

app.listen(Port,()=>{
    connectdb();
    console.log("Server is running on port 5000");
})