import express, { Request, Response } from "express";
import mongoose  from "mongoose";
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectDB } from "./src/db/dbconfig";
import { error } from "console";
dotenv.config();

const app = express();
const port = process.env.PORT || 8800;

app.use(express.json())
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));



connectDB()
.then(() =>{
    app.listen(port, () =>{
        console.log(`server started running on ${port}`);  
    })
})
.catch((error) =>{
    console.log(`failed to connect with db ${error}`);
})
