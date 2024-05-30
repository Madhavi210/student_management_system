import { DepartmentModel } from "../model/index.model";
import { Express , Request, Response } from "express";
import { departmentValidate } from "../validate/data.validate";

export class DepartmentService {
    createDepartment = async (req:Request, res:Response) =>{
            await departmentValidate.validate(req.body)
            const data = await DepartmentModel.create(req.body)
            if(!data){
                throw new Error("validation error")
            }
            return data        
    }

    getAllDepartment = async (req:Request , res:Response) =>{
            const data = await DepartmentModel.find();
            return data;
    }

    getDepartmentById = async (req:Request, res:Response) =>{
            const {id} = req.params;
            const data = await DepartmentModel.findById(id)
            return data;
    }

    deleteDepartmentById = async(req:Request, res:Response) =>{ 
            const {id} = req.params;
            const data  = await DepartmentModel.findByIdAndDelete(id)
            return data;
    }

    deleteAllDepartment = async(req:Request, res:Response) =>{
            const data = await DepartmentModel.deleteMany();
            return data;
    }

    updateDepartmentById = async (req:Request, res:Response) =>{ 
            const {id} = req.params;
            const {departmentName, headTeacher, subjects, subjectName, facultyName} = req.body;

        //     if(!departmentName || !headTeacher || !subjects){
        //         return res.status(400).json({ error: 'All fields are required.' });
        //     }            
        //     await departmentValidate.validate(req.body)
            const data = await DepartmentModel.findByIdAndUpdate(id, {departmentName, headTeacher, subjects, subjectName, facultyName}, {new:true});            
            if (!data) {
                return res.status(404).json({ error: 'dept not found.' });
            }
            return data;
    }

}

