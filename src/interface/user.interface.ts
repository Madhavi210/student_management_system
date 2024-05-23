import  {Document, Schema} from "mongoose";
import {  IDepartment, IFees, INotification } from "./index.interface";

export interface IUser extends Document {
    userName : string,
    email: string ,
    password: string,
    age: number,
    gender: "male" | "female" | "other";
    role: "student" | "teacher" | "principal";
    dob: Date,
    profilePic: string , //url 
    address: string,
    accessToken?: string;
    refreshToken?: string
} ;

export interface ITeacher extends IUser {};

export interface IPrincipal extends IUser {} ;

export interface IStudent extends IUser{
    enrollmentNo: number;
    department: Schema.Types.ObjectId | IDepartment;
    advisor: Schema.Types.ObjectId | ITeacher;
}




