import {Document, Schema} from "mongoose";
import { ITeacher } from "./index.interface";
import { departmentName } from "../enum/index.enum";

export interface IDepartment extends Document {
    departmentName : string,
    headTeacher : Schema.Types.ObjectId | ITeacher, 
    subjects: {
         subjectName: string; 
         facultyName: Schema.Types.ObjectId  | ITeacher; 
    }[];
};


// how to give subject department wise 