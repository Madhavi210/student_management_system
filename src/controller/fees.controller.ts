import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { userModel } from "../model/user.model";
import { FeesServiceClass } from "../service/index.service";
import express , {Request, Response} from 'express';

const feesServiceClass = new FeesServiceClass();
export class FeesControllerClass {
    createfees = async(req:Request, res:Response) => {
        try {
            const data = await feesServiceClass.createfees(req, res);               
            const response = new apiResponse(200, data , "fees added successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getfeesById = async(req:Request, res:Response) =>{
        try {
            const data = await feesServiceClass.getfeesById(req,res)
            const response = new apiResponse(200,data, "fees retrived successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllfees = async (req:Request, res:Response) => {
        try {
            const data = await feesServiceClass.getAllfees(req,res);
            const totalRecord = await userModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "fees retrived successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteAllfees = async(req:Request, res:Response) =>{
        try {
            const data = await feesServiceClass.deleteAllfees(req,res);
            const response = new apiResponse(200, {data}, "all fees deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deletefeesById = async (req:Request, res:Response) =>{
        try {
            const data = await feesServiceClass.deletefeesById(req,res);
            const response = new apiResponse(200, {data}, " fees deleted by id successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateFeesById = async (req:Request, res:Response) =>{ 
        try {
            const data = await feesServiceClass.updateFeesById(req, res)
            const response = new apiResponse(200, {data}, " fees updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }
}