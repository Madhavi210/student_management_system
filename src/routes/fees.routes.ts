
import express, {Request,Response  } from "express";
import { feesControllerClass } from "../controller/index.controller";

const router = express.Router();
const FeesControllerClass = new feesControllerClass();

router.get('/getall', FeesControllerClass.getAllfees);

router.get('/:id', FeesControllerClass.getfeesById);

router.post('/post', FeesControllerClass.createfees);

router.put('/updatefees/:id', FeesControllerClass.updateFeesById);

router.delete('/delete/:id', FeesControllerClass.deletefeesById);  

router.delete("/deleteAll", FeesControllerClass.deleteAllfees);

export default router;

