import mongoose, {Schema, Model } from "mongoose";
import { gender, role ,resultStatus} from "../enum/index.enum";
import {  IDepartment, IFees, INotification, IResult, IUser } from "../interface/index.interface";

const notificationSchema = new Schema<INotification>({
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "usreModel",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    read: {
        type:Boolean,
        default: false,
    },
},{timestamps: true})

export const notificationModel : Model<INotification>= mongoose.model("notificationModel", notificationSchema) 

















