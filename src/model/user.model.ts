
import mongoose ,{Schema, Model} from "mongoose";
import { IPrincipal, IStudent,ITeacher, IUser } from "../interface/index.interface";
import { gender, role } from "../enum/index.enum";


const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
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


