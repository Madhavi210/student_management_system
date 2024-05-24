
import express, {Request,Response  } from "express";
import { departmentControllerClass } from "../controller/index.controller";

const router = express.Router();
const deptControllerClass = new departmentControllerClass();

router.get('/getall', deptControllerClass.getAllDepartment);

router.get('/:id', deptControllerClass.getDepartmentById);

router.post('/post', deptControllerClass.createDepartment);

router.put('/updatedept/:id', deptControllerClass.updateDepartmentById);

router.delete('/delete/:id', deptControllerClass.deleteDepartmentById);  

router.delete("/deleteAll", deptControllerClass.deleteAllDepartment);

export default router;

