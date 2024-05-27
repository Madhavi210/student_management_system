
import express, {Request,Response  } from "express";
import { resultControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const ResultControllerClass = new resultControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();

router.get('/getresult', ResultControllerClass.getAllResult);

router.get('/:id', ResultControllerClass.getResultById);

router.post('/post', authMiddleware.isPrincipalOrTeacher, ResultControllerClass.createResult);

router.put('/updateResult/:id',  authMiddleware.isPrincipalOrTeacher, ResultControllerClass.updateResultById);

router.delete('/delete/:id',  authMiddleware.isPrincipalOrTeacher, ResultControllerClass.deleteResultById);  

router.delete("/deleteAll",  authMiddleware.isPrincipal, ResultControllerClass.deleteAllResult);

router.get("/pdf/:id", ResultControllerClass.downloadPDF);


export default router;

