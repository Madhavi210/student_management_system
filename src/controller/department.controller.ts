import express, {Request, Response} from 'express';
import { departmentService } from '../service/index.service';
import { apiError } from '../helper/apiError';
import { apiResponse } from '../helper/apiResponse';

const DepartmentService = new departmentService();

export class departmentControllerClass {
    createDepartment = async (req:Request, res:Response) =>{
        try {
            const data = await DepartmentService.createDepartment(req, res);
            const response = new apiResponse(200, data, "department created successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, 'Internal server Error', [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    getAllDepartment = async (req:Request, res:Response) =>{
        try {
            const data = await DepartmentService.getAllDepartment(req, res)
            const response = new apiResponse(200, data, 'all department retrieved successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getDepartmentById = async (req:Request, res:Response) =>{
        try {
            const data = await DepartmentService.getDepartmentById( req, res)
            const response = new apiResponse(200, data, 'department by id retrieved successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    deleteDepartmentById = async(req:Request, res:Response) =>{ 
        try {
            const data = await DepartmentService.getDepartmentById( req, res)
            const response = new apiResponse(200, data, 'department by id deleted successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }
    deleteAllDepartment = async(req:Request, res:Response) =>{
        try {
            const data = await DepartmentService.deleteAllDepartment( req, res)
            const response = new apiResponse(200, data, 'department by id deleted successfully')
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    updateDepartmentById = async (req:Request, res:Response) =>{ 
        try {
            const data = await DepartmentService.updateDepartmentById(req, res)
            const response = new apiResponse(200, {data}, " department updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }
}


