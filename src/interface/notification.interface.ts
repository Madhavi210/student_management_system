import {Document, Schema} from "mongoose";
import { IUser } from "./index.interface";


export interface INotification extends Document {
    receiver : Schema.Types.ObjectId | IUser
    message: string;
    description: string;
    read: boolean;
};

