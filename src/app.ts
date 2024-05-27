import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session';
import mongoose from 'mongoose';
import { connectDB } from "./config/dbconfig";
import { userRouter,feesRouter, resultRouter, departmentRouter, notificationRouter } from "./routes/index.routes";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8800;

connectDB()
.then(() =>{
    app.listen(port, () =>{
        console.log(`server started running on ${port}`);  
    })
})
.catch((error) =>{
    console.log(`failed to connect with db ${error}`);
})


// Session store configuration

app.use(session({
  secret: process.env.SESSION_SECRET! ,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24,  // 1 day
    httpOnly: true } 
}));

app.use(express.json())
app.use(express.static('./uploads'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/fees',feesRouter);
app.use('/api/v1/result',resultRouter);
app.use('/api/v1/dept',departmentRouter);
app.use('/api/v1/notify',notificationRouter);




