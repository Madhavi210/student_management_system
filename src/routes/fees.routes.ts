
import express, {Request,Response  } from "express";
import { FeesControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const feesControllerClass = new FeesControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();

router.get('/getall', feesControllerClass.getAllfees);

router.get('/:id', feesControllerClass.getfeesById);

router.post('/post', authMiddleware.isPrincipalOrTeacher ,feesControllerClass.createfees);

router.put('/updatefees/:id', authMiddleware.isLoggedIn, authMiddleware.isPrincipalOrTeacher, feesControllerClass.updateFeesById);

router.delete('/delete/:id',  authMiddleware.isLoggedIn,authMiddleware.isPrincipalOrTeacher, feesControllerClass.deletefeesById);  

router.delete("/deleteAll", authMiddleware.isLoggedIn, authMiddleware.isPrincipalOrTeacher, feesControllerClass.deleteAllfees);

export default router;

