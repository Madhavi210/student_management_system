
import express, {Request,Response  } from "express";
import { DepartmentControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const deptControllerClass = new DepartmentControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();

router.get('/getall', deptControllerClass.getAllDepartment);

router.get('/:id', deptControllerClass.getDepartmentById);

router.post('/post',  authMiddleware.isLoggedIn, authMiddleware.isPrincipal, deptControllerClass.createDepartment);

router.put('/updatedept/:id',  authMiddleware.isLoggedIn, authMiddleware.isPrincipal,  deptControllerClass.updateDepartmentById);

router.delete('/delete/:id', authMiddleware.isLoggedIn,  authMiddleware.isPrincipal, deptControllerClass.deleteDepartmentById);  

router.delete("/deleteAll",  authMiddleware.isLoggedIn, authMiddleware.isPrincipal,  deptControllerClass.deleteAllDepartment);

export default router;
