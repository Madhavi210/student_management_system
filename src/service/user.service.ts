import { userModel , StudentModel, PrincipalModel, TeacherModel, resultModel, feesModel} from "../model/index.model";
import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt'
import { userValidate } from "../validate/data.validate";
import { skip } from "node:test";
import { error } from "node:console";
import { gender, role } from "../enum/user.enum";
import randomstring from 'randomstring';
import { transporter } from "../utils/emailGenerate";


export class UserServiceClass{ 
    createUser = async(req:Request, res:Response) => {
            await userValidate.validate(req.body)
            const {password, ...otherDetail} = req.body;
            const profilepic = req.file ? req.file.path:'';
            const hashedPassword = await bcrypt.hash(password, 10); 
            const data = await userModel.create({password: hashedPassword, profilepic, ...otherDetail});
            return data;
    }

    //do not use create method.
    createUser2 = async (req:Request, res:Response) =>{
        await userValidate.validate(req.body)
        const {password, ...otherDetail} = req.body;
        const hashedPass = await bcrypt.hash(password, 10) 
        const user = new userModel({password:hashedPass, ...otherDetail})
        await user.save();
        return user;
    }

    getUserById = async(req:Request, res:Response) =>{
            const {id} = req.params;            
            const data = await userModel.findById(id);
            return data;
    }

    getAllUser = async (req:Request, res:Response) => {
            // const data  = userModel.find();
            const page = parseInt(req.query.page as string ) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery:any = {};
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {userName : {$regex: searchValue, $options : 'i'}},
                    {email: {$regex:searchValue, $options: 'i'}},
                    {role: {$regex: searchValue, $options:'i'}},
                    {age: {$regex: searchValue, $options:'i'}},
                    {gender: {$regex: searchValue, $options: 'i'}},
                    {address: {$regex:searchValue, $options: 'i'}}
                ];
            }
            if (req.query.gender) {
                searchQuery.gender = req.query.gender; // Filter by specific gender
            }
            if (req.query.role) {
                searchQuery.role = req.query.role; // Filter by specific role
            }

            // if (req.query.ageGreaterThan) {
            //     searchQuery.age = { $gt: parseInt(req.query.ageGreaterThan as string) };
            // }
            if(req.query.avgUserAge){
                searchQuery.age = {$group :{ agerageAge: {$avg :"$age"}}}
            }
            const roleFilter = { role: "student" };
            // const filter = { ...searchQuery, ...roleFilter }; add here and remove $match in pipeline
            
            const filter : any= {};
            if (req.query.filter) {
                filter.$and = [];
                if (req.query.gender) {
                    filter.$and.push({ gender: req.query.gender });
                }
                if (req.query.role) {
                    filter.$and.push({ role: req.query.role });
                }
                if (req.query.ageGreaterThan) {
                    const ageThreshold = parseInt(req.query.ageGreaterThan as string);
                    filter.$and.push({ age: { $gt: ageThreshold } });
                }
            }
            // if(req.query.filter) {
            //     const {
            //         gender,role, age
            //     } = req.query ;


            //     const userGender = gender
            //     const userRole = role
            //     const userAge =age
                
            //     filter.$and = [
            //         // {gender: "male"},
            //         // {role: "student"},
            //         // {age: {$gt: 20}}
            //         {gender: {$regex: userGender?.toString(), $options:'i'}},
            //         {role: {$regex: userRole?.toString(), $options:"i"}},
            //         {age: {$regex:userAge?.toString(), $options:'i'}}
            //     ]
            // }
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending
            
            
            const searching = {...searchQuery}
            const filtering = {...filter}

            const pipeline = [
                // {$match:{ role: "student"}},
                {$match: {...searching,}},
                // {$match: { ...filtering}},

                // {$match: roleFilter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data = await userModel.aggregate(pipeline).exec();            
            // res.status(200).json({MESSAGE:"Data", pipeline})
            return data;
    }

    getAllStudent = async (req:Request, res:Response) => {
            // const data  = userModel.find();
            const page = parseInt(req.query.page as string ) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const skip = Math.max(page - 1, 0) * limit;

            const searchQuery:any = {};
            if(req.query.search) {
                const searchValue = req.query.search as string;
                searchQuery.$or = [
                    {userName : {$regex: searchValue, $options : 'i'}},
                    {email: {$regex:searchValue, $options: 'i'}},
                    {role: {$regex: searchValue, $options:'i'}},
                    {age: {$regex: searchValue, $options:'i'}},
                    {gender: {$regex: searchValue, $options: 'i'}},
                    {address: {$regex:searchValue, $options: 'i'}}
                ];
            }
            if (req.query.gender) {
                searchQuery.gender = req.query.gender; // Filter by specific gender
            }
        
            const filter : any= {};
            if (req.query.filter) {
                filter.$and = [];
                if (req.query.gender) {
                    filter.$and.push({ gender: req.query.gender });
                }
                if (req.query.role) {
                    filter.$and.push({ role: req.query.role });
                }
                if (req.query.ageGreaterThan) {
                    const ageThreshold = parseInt(req.query.ageGreaterThan as string);
                    filter.$and.push({ age: { $gt: ageThreshold } });
                }
            }
            
            const sort = req.query.sort ? JSON.parse(req.query.sort as string) : { createdAt: -1 }; // default sorting by createdAt descending
            
            
            const searching = {...searchQuery}
            const filtering = {...filter}

            const pipeline = [
                {$match:{ role: "student"}},
                {$match: {...searching,}},
                {$match: { ...filtering}},

                // {$match: roleFilter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data = await userModel.aggregate(pipeline).exec();            
            return data;
    }

    deleteAllUser = async(req:Request, res:Response) =>{
            const data = await userModel.deleteMany()
            return data;
    }

    deleteUserById = async (req:Request, res:Response) =>{
            const {id} = req.params; 
            const user = await userModel.findById(id);
            if(!user){
                console.log("user not found");
                return;
            }
            const deletedResult = await resultModel.deleteMany({studentId: id});
            const deletedFess= await feesModel.deleteMany({studentId: id});
            const data = await userModel.findByIdAndDelete(id);

            return data;
    }

    updateUserById = async (req:Request, res:Response) =>{ 
            const {id} = req.params;
            const {userName, password, email, age,gender , role,  dob, address, profilePic} = req.body;

            if(!userName || !email || !password){
                return res.status(400).json({ error: 'All fields are required.' });
            }            
            await userValidate.validate(req.body)
            const data = await userModel.findByIdAndUpdate(id, {userName, email, password,age, gender,role, dob, profilePic, address}, {new:true});            
            if (!data) {
                return res.status(404).json({ error: 'User not found.' });
            }
            return data;
    };

    sendPasswordEmail = async (toEmail: string, password: string) => {
        const length = 10;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}|:<>?'; //alphanumeric
        const newPassword = randomstring.generate({length, charset});
        // const updatedUser =  await User
        console.log(newPassword);
        console.log("service");
        


        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "madhavijoshi6023@gmail.com",
          subject: 'reset password ',
          text:  `your new password: ${newPassword}`,
        };
          const info = await transporter.sendMail(mailOptions);
          console.log('Message sent: %s', info.messageId);
      };

    //   resetPassword = async(req:Request, res:Response) =>{
    //     try {
    //         const {email, token, newPassword} = req.body;
    //         const user = await userModel.findOne({email, token });

    //     } catch (error:any) {
    //         throw new Error(error.message)
    //     }
    //   }

}


