
import express, {Request,Response  } from "express";
import { departmentControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";


const router = express.Router();
const deptControllerClass = new departmentControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();


router.get('/getall', deptControllerClass.getAllDepartment);

router.get('/:id', deptControllerClass.getDepartmentById);

router.post('/post',authMiddleware.isPrincipal, deptControllerClass.createDepartment);

router.put('/updatedept/:id',authMiddleware.isPrincipal,  deptControllerClass.updateDepartmentById);

router.delete('/delete/:id', authMiddleware.isPrincipal, deptControllerClass.deleteDepartmentById);  

router.delete("/deleteAll",authMiddleware.isPrincipal,  deptControllerClass.deleteAllDepartment);

export default router;

