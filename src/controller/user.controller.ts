import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { userModel } from "../model/index.model";
import { userServiceClass } from "../service/index.service";
import express , {Request, Response} from 'express';

const UserServiceClass = new userServiceClass();
export class userControllerClass {
    createUser = async(req:Request, res:Response) => {
        try {
            const data = await UserServiceClass.createUser(req, res);               
            const response = new apiResponse(200, data , "users created successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getUserById = async(req:Request, res:Response) =>{
        try {
            const data = await UserServiceClass.deleteUserById(req,res)
            const response = new apiResponse(200,data, "users created successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllUser = async (req:Request, res:Response) => {
        try {
            const data = await UserServiceClass.getAllUser(req,res);
            const totalRecord = await userModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "users retrive successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteAllUser = async(req:Request, res:Response) =>{
        try {
            const data = await UserServiceClass.deleteAllUser(req,res);
            const response = new apiResponse(200, {data}, "all user deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteUserById = async (req:Request, res:Response) =>{
        try {
            const data = await UserServiceClass.deleteUserById(req,res);
            const response = new apiResponse(200, {data}, " user deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateUserById = async (req:Request, res:Response) =>{ 
        try {
            const data = await UserServiceClass.updateUserById(req, res)
            const response = new apiResponse(200, {data}, " user updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }
}