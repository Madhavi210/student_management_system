import express ,{Request , Response} from 'express'
import { feesModel } from '../model/index.model'
import { feesValidate } from '../validate/data.validate'


export class FeesServiceClass {
    createfees = async (req:Request, res:Response) =>{
            await feesValidate.validate(req.body)
            const data = await feesModel.create(req.body)
            if(!data){
                throw new Error("validation error")
            }
            return data        
    }

    getAllfees = async (req:Request , res:Response) =>{
            const data = await feesModel.find();
            return data;
    }

    getfeesById = async (req:Request, res:Response) =>{
            const {id} = req.params;
            const data = await feesModel.findById(id)
            return data;
    }

    deletefeesById = async(req:Request, res:Response) =>{ 
            const {id} = req.params;
            const data  = await feesModel.findByIdAndDelete(id)
            return data;
    }

    deleteAllfees = async(req:Request, res:Response) =>{
            const data = await feesModel.deleteMany();
            return data;

    }

    updateFeesById = async (req:Request, res:Response) =>{ 
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
    }
}
