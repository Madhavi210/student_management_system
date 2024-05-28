import mongoose , {Document, Schema, Model} from "mongoose";
import { IUser, IDepartment,  INotification, IPrincipal,ITeacher, IStudent } from "./index.interface";


export interface IFees extends Document {
    student : Schema.Types.ObjectId,
    totalAmount? : number;
    paidAmount:  number;
    remainAmount?: number; 
    paidDate: Date;
    payment: {
        paymentStatus: "success" | 'pending' | 'fail';
        paymentMode: "cash" | "online";
    }
};