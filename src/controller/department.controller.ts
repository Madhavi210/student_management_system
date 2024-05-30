import express, {Request, Response} from 'express';
import { DepartmentService } from '../service/index.service';
import { apiError } from '../helper/apiError';
import { apiResponse } from '../helper/apiResponse';
import { DepartmentModel } from '../model/department.model';

const departmentService = new DepartmentService();

export class DepartmentControllerClass {
    createDepartment = async (req:Request, res:Response) =>{
        try {
            const data = await departmentService.createDepartment(req, res);
            const response = new apiResponse(200, data, "department created successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal server Error', [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    getAllDepartment = async (req:Request, res:Response) =>{
        try {
            const data = await departmentService.getAllDepartment(req, res);
            const totalRecord = await DepartmentModel.countDocuments();
            const totalPage = Math.ceil(totalRecord / parseInt(req.query.limit as string ) || 10); 
            const response = new apiResponse(200, {data, totalRecord, totalPage, }, 'all department retrieved successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getDepartmentById = async (req:Request, res:Response) =>{
        try {
            const data = await departmentService.getDepartmentById( req, res)
            const response = new apiResponse(200, data, 'department by id retrieved successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    deleteDepartmentById = async(req:Request, res:Response) =>{ 
        try {
            const data = await departmentService.getDepartmentById( req, res)
            const response = new apiResponse(200, data, 'department by id deleted successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }
    deleteAllDepartment = async(req:Request, res:Response) =>{
        try {
            const data = await departmentService.deleteAllDepartment( req, res)
            const response = new apiResponse(200, data, 'department by id deleted successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    updateDepartmentById = async (req:Request, res:Response) =>{ 
        try {
            const data = await departmentService.updateDepartmentById(req, res)
            const response = new apiResponse(200, {data}, " department updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }
}


