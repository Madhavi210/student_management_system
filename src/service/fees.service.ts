import express ,{Request , Response} from 'express'
import { feesModel } from '../model/index.model'
import { feesValidate } from '../validate/data.validate'


export class FeesServiceClass {
    createfees = async (req:Request, res:Response) =>{
        try {
            await feesValidate.validate(req.body)
            const data = await feesModel.create(req.body)
            if(!data){
                throw new Error("validation error")
            }
            return data
        } catch (error:any) {
            throw new Error(error.message)
        }        
    }

    getAllfees = async (req:Request , res:Response) =>{
        try {
            const data = await feesModel.find();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getfeesById = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await feesModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deletefeesById = async(req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const data  = await feesModel.findByIdAndDelete(id)
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    deleteAllfees = async(req:Request, res:Response) =>{
        try {
            const data = await feesModel.deleteMany();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    updateFeesById = async (req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const {student , totalAmount,paidAmount, remainAmount, paidDate, payment, paymentMode, paymentStatus } = req.body;

            if(!student || !paidAmount || !payment){
                return res.status(400).json({ error: 'All fields are required.' });
            }            
            await feesValidate.validate(req.body)
            const data = await feesModel.findByIdAndUpdate(id, {student, totalAmount, paidAmount,remainAmount,paidDate, payment,  paymentMode, paymentStatus  }, {new:true});            
            if (!data) {
                return res.status(404).json({ error: 'fees not found.' });
            }
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
