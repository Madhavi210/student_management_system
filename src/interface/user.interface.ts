import  {Document, Schema} from "mongoose";
import {  IDepartment, IFees, INotification } from "./index.interface";
import { gender, role } from "../enum/index.enum";

export interface IUser extends Document {
    userName : string,
    email: string ,
    password: string,
    age: number,
    gender: gender;
    role: role;
    dob: Date,
    profilePic: string , //url 
    address: string,
    accessToken?: string;
    refreshToken?: string;
    enrollmentNo?: number;
} ;

export interface ITeacher extends IUser {};

export interface IPrincipal extends IUser {} ;

export interface IStudent extends IUser {};

