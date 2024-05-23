import mongoose, {Schema, Model, mongo } from "mongoose";
import { gender, role ,resultStatus, paymentStatus, paymentMode} from "../enum/index.enum";
import {  IDepartment, IFees, INotification, IResult, IUser } from "../interface/index.interface";


const feesSchema = new Schema<IFees>({
    student : {
        type: Schema.Types.ObjectId,
        ref: "userModel"
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true,
    },
    remainAmount: {
        type: Number,
        required: true,
    },
    paidDate: {
        type: Date,
        default: Date.now,
    },
    payment:{
        paymentStatus:{
            type: String,
            enum: Object.values(paymentStatus),
            required: true,
        },
        paymentMode:{
            type: String,
            enum: Object.values(paymentMode),
            required: true,
            default: paymentMode.CASH,
        }
    }
},{timestamps:true})

export const feesModel:Model<IFees> = mongoose.model("feesModel", feesSchema) 