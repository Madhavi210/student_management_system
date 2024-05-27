import { apiError } from "../helper/apiError";
import { apiResponse } from "../helper/apiResponse";
import { resultModel } from "../model/index.model";
import { resultService } from "../service/index.service";
import express , {Request, Response} from 'express';

const ResultService = new resultService();
export class resultControllerClass {
    createResult = async(req:Request, res:Response) => {
        try {
            const data = await ResultService.createResult(req, res);               
            const response = new apiResponse(200, data , "result added successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getAllResult = async(req:Request, res:Response) =>{
        try {
            const data = await ResultService.getAllResult(req,res)
            const response = new apiResponse(200,data, "result retrived successfully",);
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal Server Error", [ error.message, ]);
            res.status(errResponse.statuscode).json(errResponse);
        }
    }

    getResultById = async (req:Request, res:Response) => {
        try {
            const data = await ResultService.getResultById(req,res);
            const totalRecord = await resultModel.countDocuments()
            const totalPages = Math.ceil(totalRecord / (parseInt(req.query.limit as string ) || 10))            
            const response = new apiResponse(200, { totalRecord, totalPages, currentPage:( parseInt(req.query.limit as string) || 1) , data}, "result retrived successfully")
            res.status(response.statuscode).json(response)
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteAllResult = async(req:Request, res:Response) =>{
        try {
            const data = await ResultService.deleteAllResult(req,res);
            const response = new apiResponse(200, {data}, "all result deleted successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    deleteResultById = async (req:Request, res:Response) =>{
        try {
            const data = await ResultService.deleteResultById(req,res);
            const response = new apiResponse(200, {data}, " result deleted by id successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    }

    updateResultById = async (req:Request, res:Response) =>{ 
        try {
            const data = await ResultService.updateResultById(req, res)
            const response = new apiResponse(200, {data}, " result updated successfully")
            res.status(response.statuscode).json(response);
        } catch (error:any) {
            const errResponse = new apiError(500, "Internal server error", [error.message])
            res.status(errResponse.statuscode).json(errResponse)
        }
    };

    downloadPDF = async (req: Request, res: Response) => {
        try {
          const doc = await ResultService.getResultDetailPDF(req, res);
          if (doc) {
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
              "Content-Disposition",
              'attachment; filename="result_details.pdf"',
            );
            doc.pipe(res);
            doc.end();
          } else {
            const errResponse = new apiError(500, "Internal Server Error", [ "error generating pdf",]);
            res.status(errResponse.statuscode).json(errResponse);
          }
        } catch (error: any) {
          const errResponse = new apiError(500, "Internal Server Error", [error.message, ]);
          res.status(errResponse.statuscode).json(errResponse);
        }
      };
}