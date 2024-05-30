import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { notificationModel } from "../model/index.model";
import { NotificationService } from "../service/index.service";
import express , {Request, Response} from 'express';

const notificationService = new NotificationService();
export class NotificationControllerClass {
    createNotification = async(req:Request, res:Response) => {
        try {
            const data = await notificationService.createNotification(req, res);               
            const response = new apiResponse(200, data , "notification added successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getNotificationById = async(req:Request, res:Response) =>{
        try {
            const data = await notificationService.getNotificationById(req,res)
            const response = new apiResponse(200,data, "notification retrieved successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllNotification = async (req:Request, res:Response) => {
        try {
            const data = await notificationService.getAllNotification(req,res);
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
            const data = await notificationService.deleteAllNotification(req,res);
            const response = new apiResponse(200, data, "all notification deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteNotificationById = async (req:Request, res:Response) =>{
        try {
            const data = await notificationService.deleteNotificationById(req,res);
            const response = new apiResponse(200, data, " notification deleted by id successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateNotificationById = async (req:Request, res:Response) =>{ 
        try {
            const data = await notificationService.updateNotificationById(req, res)
            const response = new apiResponse(200,  data, " notification updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    notifyUser = async (req: Request, res: Response) => {
        const { email, password } = req.body;
      
        try {
          await notificationService.sendResultEmail(email, password);
          res.status(200).send('Password email sent successfully');
        } catch (error) {
          res.status(500).send('Error sending password email');
        }
      };
}




