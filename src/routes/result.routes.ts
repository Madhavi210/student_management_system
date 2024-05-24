
import express, {Request,Response  } from "express";
import { resultControllerClass } from "../controller/index.controller";

const router = express.Router();
const ResultControllerClass = new resultControllerClass();

router.get('/getresult', ResultControllerClass.getAllResult);

router.get('/:id', ResultControllerClass.getResultById);

router.post('/post', ResultControllerClass.createResult);

router.put('/updateResult/:id', ResultControllerClass.updateResultById);

router.delete('/delete/:id', ResultControllerClass.deleteResultById);  

router.delete("/deleteAll", ResultControllerClass.deleteAllResult);

export default router;

