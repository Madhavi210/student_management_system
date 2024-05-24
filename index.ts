import express, { Request, Response } from "express";
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { connectDB } from "./src/db/dbconfig";
import { userRouter,feesRouter, resultRouter, departmentRouter, notificationRouter } from "./src/routes/index.routes";

dotenv.config();

const app = express();
const port = process.env.PORT ?? 8800;

app.use(express.json())
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api/v1/user',userRouter);
app.use('/api/v1/fees',feesRouter);
app.use('/api/v1/result',resultRouter);
app.use('/api/v1/dept',departmentRouter);
app.use('/api/v1/notify',notificationRouter);


connectDB()
.then(() =>{
    app.listen(port, () =>{
        console.log(`server started running on ${port}`);  
    })
})
.catch((error) =>{
    console.log(`failed to connect with db ${error}`);
})
