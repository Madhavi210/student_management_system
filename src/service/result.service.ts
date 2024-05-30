import {  resultModel } from "../model/index.model";
import { Express , Request, Response } from "express";
import { resultValidate } from "../validate/data.validate";
import { generatePDF } from "../utils/pdfGenerator";
import { IResult } from "../interface/result.interface";
import {resultStatus} from '../enum/result.enum'

export class ResultService {

    calculateResult =  (result:IResult):IResult =>{
        const {obtainMarks, totalMarks} = result;
        const percentage = (obtainMarks / totalMarks) * 100;
        let grade = '';
        let status ;

        if (percentage >= 90) {
            grade = 'A+';
            status = resultStatus.PASS;
        } else if (percentage >= 80) {
            grade = 'A';
            status = resultStatus.PASS;
        } else if (percentage >= 70) {
            grade = 'B';
            status = resultStatus.PASS;
        } else if (percentage >= 60) {
            grade = 'C';
            status = resultStatus.PASS;
        } else if (percentage >= 50) {
            grade = 'D';
            status = resultStatus.PASS;
        } else {
            grade = 'F';
            status = resultStatus.FAIL;
        }
        result.grade = grade;
        result.percentage = percentage;
        result.status = status;
        return result;
    }

    // calculateRank = async () => {
    //     try {
    //         const results = await resultModel.find().sort({percentage: -1});
    //         for(let i=0; i<results.length; i++){
    //             const result = results[i];
    //             result.rank = i + 1;
    //             await result.save();
    //         }
    //     } catch (error: any) {
    //         throw new Error(error.message)
    //     }
    // }

    createResult = async (req:Request, res:Response) =>{
        try {
            await resultValidate.validate(req.body)
            const resultData = this.calculateResult(req.body);
            const data = await resultModel.create(resultData)
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
            return res.status(404).json({ message: "No RESULT to show" });
          }
          const doc = await generatePDF(data);
          return doc;
        } catch (error: any) {
          res.status(401).json({ message: error.message });
        }
      };

}

