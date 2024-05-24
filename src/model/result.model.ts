import mongoose,{Schema, Model} from "mongoose";
import { gender, role ,resultStatus} from "../enum/index.enum";
import {  IDepartment, IFees, INotification, IResult, IUser } from "../interface/index.interface";
import { number } from "yup";

const resultSchema = new Schema<IResult>({
    student:{
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    obtainMarks: {
        type: Number,
        required: true,
    },
    totalMarks : {
        type: Number,
    },
    grade: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },
    status: {
        enum: Object.values(resultStatus),
        type: String,
        required: true,
    },
    rank: {
        type: String,
    }
},{timestamps:true})

export const resultModel: Model<IResult> = mongoose.model("resultModel", resultSchema)
















