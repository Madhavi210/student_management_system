import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { notificationModel } from "../model/index.model";
import { notificationService } from "../service/index.service";
import express , {Request, Response} from 'express';

const NotificationService = new notificationService();
export class notificationControllerClass {
    createNotification = async(req:Request, res:Response) => {
        try {
            const data = await NotificationService.createNotification(req, res);               
            const response = new apiResponse(200, data , "notification added successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllNotification = async(req:Request, res:Response) =>{
        try {
            const data = await NotificationService.getAllNotification(req,res)
            const response = new apiResponse(200,data, "notification retrived successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getNotificationById = async (req:Request, res:Response) => {
        try {
            const data = await NotificationService.getNotificationById(req,res);
            const totalRecord = await notificationModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "notification retrived by id successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteAllNotification = async(req:Request, res:Response) =>{
        try {
            const data = await NotificationService.deleteAllNotification(req,res);
            const response = new apiResponse(200, {data}, "all notification deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteNotificationById = async (req:Request, res:Response) =>{
        try {
            const data = await NotificationService.deleteNotificationById(req,res);
            const response = new apiResponse(200, {data}, " notification deleted by id successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateNotificationById = async (req:Request, res:Response) =>{ 
        try {
            const data = await NotificationService.updateNotificationById(req, res)
            const response = new apiResponse(200, {data}, " notification updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }
}