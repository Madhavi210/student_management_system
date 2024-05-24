
import express, {Request,Response  } from "express";
import { userControllerClass } from "../controller/index.controller";

const router = express.Router();
const UserControllerObj = new userControllerClass();

router.get('/getUser', UserControllerObj.getAllUser);

router.get('/:id', UserControllerObj.getUserById);

router.post('/post', UserControllerObj.createUser);

router.put('/updateUser/:id', UserControllerObj.updateUserById);

router.delete('/delete/:id', UserControllerObj.deleteUserById);  

router.delete("/deleteAll", UserControllerObj.deleteAllUser);

export default router;



