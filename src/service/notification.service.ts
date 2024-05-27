import {  notificationModel } from "../model/index.model";
import { Express , Request, Response } from "express";
import {  notificationValidate } from "../validate/data.validate";
import { transporter } from '../utils/emailGenerate';

export class NotificationService {
    createNotification = async (req:Request, res:Response) =>{
        try {
            await notificationValidate.validate(req.body)
            const data = await notificationModel.create(req.body)
            if(!data){
                throw new Error("validation error")
            }
            return data
        } catch (error:any) {
            throw new Error(error.message)
        }        
    }

    getAllNotification = async (req:Request , res:Response) =>{
        try {
            const data = await notificationModel.find();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getNotificationById = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await notificationModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteNotificationById = async(req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const data  = await notificationModel.findByIdAndDelete(id)
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    deleteAllNotification = async(req:Request, res:Response) =>{
        try {
            const data = await notificationModel.deleteMany();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    updateNotificationById = async (req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const {receiver, message, description, read } = req.body;

            if(!receiver|| !message){
                return res.status(400).json({ error: 'All fields are required.' });
            }            
            await notificationValidate.validate(req.body)
            const data = await notificationModel.findByIdAndUpdate(id, {receiver, message, description, read}, {new:true});            
            if (!data) {
                return res.status(404).json({ error: 'notification not found.' });
            }
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    sendPasswordEmail = async (toEmail: string, password: string): Promise<void> => {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: "madhavi@gmail.com",
          subject: 'holiday info',
          text: `diwali festival`,
        };
        try {
          const info = await transporter.sendMail(mailOptions);
          console.log('Message sent: %s', info.messageId);
        } catch (error) {
          console.error('Error sending email:', error);
        }
      };

}