
import express, {Request,Response  } from "express";
import { userControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const UserControllerObj = new userControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();


router.get('/getUser', UserControllerObj.getAllUser);

router.get('/:id', UserControllerObj.getUserById);

router.post('/post', UserControllerObj.createUser);

router.put('/updateUser/:id', UserControllerObj.updateUserById);

router.delete('/delete/:id', UserControllerObj.deleteUserById);  

router.delete("/deleteAll", UserControllerObj.deleteAllUser);

router.post('/login', authMiddleware.userExist, authMiddleware.userLogin);

router.post('/refreshToken', authMiddleware.refreshToken);

router.post('/logout/', authMiddleware.userLogout);

export default router;



