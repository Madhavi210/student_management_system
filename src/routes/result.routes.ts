
import express, {Request,Response  } from "express";
import { ResultControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const resultControllerClass = new ResultControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();

router.get('/getresult', resultControllerClass.getAllResult);

router.get('/:id', resultControllerClass.getResultById);

router.post('/post',  authMiddleware.isLoggedIn, authMiddleware.isPrincipalOrTeacher, resultControllerClass.createResult);

router.put('/updateResult/:id', authMiddleware.isLoggedIn,  authMiddleware.isPrincipalOrTeacher, resultControllerClass.updateResultById);

router.delete('/delete/:id', authMiddleware.isLoggedIn, authMiddleware.isPrincipalOrTeacher, resultControllerClass.deleteResultById);  

router.delete("/deleteAll", authMiddleware.isLoggedIn,  authMiddleware.isPrincipal, resultControllerClass.deleteAllResult);

router.get("/pdf/:id", resultControllerClass.downloadPDF);


export default router;

