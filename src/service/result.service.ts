import {  resultModel } from "../model/index.model";
import { Express , Request, Response } from "express";
import { resultValidate } from "../validate/data.validate";
import { generatePDF } from "../utils/pdfGenerator";

export class resultService {
    createResult = async (req:Request, res:Response) =>{
        try {
            await resultValidate.validate(req.body)
            const data = await resultModel.create(req.body)
            if(!data){
                throw new Error("validation error")
            }
            return data
        } catch (error:any) {
            throw new Error(error.message)
        }        
    }

    getAllResult = async (req:Request , res:Response) =>{
        try {
            const data = await resultModel.find();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getResultById = async (req:Request, res:Response) =>{
        try {
            const {id} = req.params;
            const data = await resultModel.findById(id)
            return data;
        } catch (error:any) {
            throw new Error(error.message)
        }
    }

    deleteResultById = async(req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const data  = await resultModel.findByIdAndDelete(id)
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    deleteAllResult = async(req:Request, res:Response) =>{
        try {
            const data = await resultModel.deleteMany();
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    updateResultById = async (req:Request, res:Response) =>{ 
        try {
            const {id} = req.params;
            const {student, obtainMarks, totalMarks, grade, percentage, status, rank } = req.body;

            if(!student || !obtainMarks || !totalMarks){
                return res.status(400).json({ error: 'All fields are required.' });
            }            
            await resultValidate.validate(req.body)
            const data = await resultModel.findByIdAndUpdate(id, {student, obtainMarks, totalMarks, grade, percentage, status, rank}, {new:true});            
            if (!data) {
                return res.status(404).json({ error: 'result not found.' });
            }
            return data;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    getResultDetailPDF = async (req: Request, res: Response) => {
        try {
          const { id } = req.params;
          const { userId } = req.body;
          const data = await resultModel.find({ studentId: userId });
          if (!data) {
            return res.status(404).json({ message: "No cab to show" });
          }
          const doc = await generatePDF(data);
          return doc;
        } catch (error: any) {
          res.status(401).json({ message: error.message });
        }
      };

}