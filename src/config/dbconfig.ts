import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
dotenv.config();

const url : string | undefined = process.env.MONGO_URI;
if(!url){
    throw new Error("please provide url in dotenv file")
}

export const connectDB = async() =>{
    mongoose.connect(url)
        .then(() =>{
            console.log("connection successful");
        })
        .catch(() =>{
            console.log("failed to connect");
        })
} 

