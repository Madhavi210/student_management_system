import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { userModel } from "../model/index.model";
import { UserServiceClass } from "../service/index.service";
import express , {Request, Response} from 'express';
import { userValidate } from "../validate/data.validate";

const userServiceClass = new UserServiceClass();
export class UserControllerClass {
    createUser = async(req:Request, res:Response) => {
        try {
            const data = await userServiceClass.createUser(req, res);               
            const response = new apiResponse(200, data , "users created successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getUserById = async(req:Request, res:Response) =>{
        try {
            const data = await userServiceClass.getUserById(req,res);
            
            const response = new apiResponse(200, data, "user by id retrieved successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllUser = async (req:Request, res:Response) => {
        try {
            const data = await userServiceClass.getAllUser(req,res);
            const totalRecord = await userModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "users retrieved successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    getAllStudent = async (req:Request, res:Response) => {
        try {
            const data = await userServiceClass.getAllStudent(req,res);
            const totalRecord = await userModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "student retrieved successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteAllUser = async(req:Request, res:Response) =>{
        try {
            const data = await userServiceClass.deleteAllUser(req,res);
            const response = new apiResponse(200, data, "all user deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteUserById = async (req:Request, res:Response) =>{
        try {
            const data = await userServiceClass.deleteUserById(req,res);
            const response = new apiResponse(200, data, " user deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateUserById = async (req:Request, res:Response) =>{ 
        try {
            const data = await userServiceClass.updateUserById(req, res)
            const response = new apiResponse(200, data, " user updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    // sendPasswordEmail = async (req: Request, res: Response) => {
    //     try {
    //         const { email, password } = req.body;
    //         const updatedUser = await userModel.findOneAndUpdate({email: email, ...req.body})
    //         console.log(updatedUser);

    //         console.log("controller");
            
            
    //      const test = await userServiceClass.sendPasswordEmail(email, password);
    //      console.log(test);
         


    //       res.status(200).send('Password email sent successfully');
    //     } catch (error) {
    //       res.status(500).send('Error sending password email');
    //     }
    //   };
}