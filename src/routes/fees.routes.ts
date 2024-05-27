
import express, {Request,Response  } from "express";
import { feesControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const FeesControllerClass = new feesControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();

router.get('/getall', FeesControllerClass.getAllfees);

router.get('/:id', FeesControllerClass.getfeesById);

router.post('/post', authMiddleware.isPrincipalOrTeacher ,FeesControllerClass.createfees);

router.put('/updatefees/:id', authMiddleware.isPrincipalOrTeacher, FeesControllerClass.updateFeesById);

router.delete('/delete/:id', authMiddleware.isPrincipalOrTeacher, FeesControllerClass.deletefeesById);  

router.delete("/deleteAll",authMiddleware.isPrincipalOrTeacher, FeesControllerClass.deleteAllfees);

export default router;

