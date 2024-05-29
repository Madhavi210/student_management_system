
import mongoose ,{Schema, Model} from "mongoose";
import { IPrincipal, IStudent,ITeacher, IUser } from "../interface/index.interface";
import { gender, role } from "../enum/index.enum";

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true ,'email is required'],
        unique: true,
        trim: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'username must be contain ... ']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        trim: true,
        match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'password contain ...']
    },
    age: {
        type: Number,
        required: [true, 'age is required'],
        min: [0, 'Age must be a positive number'],
        max: [120, 'Age must be less than 120']
    },
    gender: {
        type: String,
        required: true,
        enum: Object.values(gender),
    },
    role: {
        type: String,
        required: true,
        enum: Object.values(role),
    },
    dob: {
        type: Date,
        required: true,
    },
    profilePic: {
        type: String,
    },
    address: {
        type:String,
    }    ,
    accessToken:{
        type: String,
    },
    refreshToken : {
        type: String,
    },
    enrollmentNo: { 
        type: Number
    },
    
},
{timestamps: true});

export const userModel: Model<IUser> = mongoose.model("userModel", userSchema);

export const TeacherModel: Model<ITeacher> = mongoose.model("TeacherModel", userSchema);
export const PrincipalModel: Model<IPrincipal> = mongoose.model("PrincipalModel", userSchema);
export const StudentModel: Model<IStudent> = mongoose.model("StudentModel", userSchema);


