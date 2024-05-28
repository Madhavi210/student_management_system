import mongoose , {Document, Schema, Model} from "mongoose";
import { IUser, IDepartment, IFees, INotification, IPrincipal,ITeacher, IStudent } from "./index.interface";

export interface IResult extends Document {
    student: Schema.Types.ObjectId | IStudent ;
    obtainMarks: number
    totalMarks: number;
    grade: string;
    percentage : number;
    status: "pass" | "fail";
    rank: string,
}

