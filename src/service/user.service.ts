import { userModel , StudentModel, PrincipalModel, TeacherModel} from "../model/index.model";
import express, {Request, Response} from 'express';
import bcrypt from 'bcrypt'
import { userValidate } from "../validate/yup.validate";
import { skip } from "node:test";
import { error } from "node:console";
import { gender, role } from "../enum/user.enum";

export class userServiceClass{ 
    createUser = async(req:Request, res:Response) => {
        try {
            await userValidate.validate(req.body)
            const {password, ...otherDetail} = req.body;
            const hashPassword = await bcrypt.hash(password, 10); 
            console.log(hashPassword);
            
            const data = await userModel.create({password: hashPassword, ...otherDetail});
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getUserById = async(req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await userModel.findById(id);
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    getAllUser = async (req:Request, res:Response) => {
        try {
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
                // {$match: {...searching,}},
                {$match: { ...filtering}},

                // {$match: roleFilter},
                {$skip: skip},
                {$limit: limit},
                {$sort: sort},
            ]

            const data = await userModel.aggregate(pipeline).exec();            
            // res.status(200).json({MESSAGE:"Data", pipeline})
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    deleteAllUser = async(req:Request, res:Response) =>{
        try {
            const data = await userModel.deleteMany()
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteUserById = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await userModel.findByIdAndDelete(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    updateUserById = async (req:Request, res:Response) =>{ 
        try {
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
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}


