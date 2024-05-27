
import express, {Request,Response  } from "express";
import { userControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";

const router = express.Router();
const UserControllerObj = new userControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();


router.get('/getUser', UserControllerObj.getAllUser);
router.get('/getStudent', UserControllerObj.getAllStudent);

router.get('/:id', UserControllerObj.getUserById);

router.post('/post', UserControllerObj.createUser);

router.put('/updateUser/:id', authMiddleware.isLoggedIn, UserControllerObj.updateUserById);

router.delete('/delete/:id', authMiddleware.isPrincipalOrTeacher, UserControllerObj.deleteUserById);  

router.delete("/deleteAll", authMiddleware.isPrincipal, UserControllerObj.deleteAllUser);

router.post('/login', authMiddleware.userExist, authMiddleware.userLogin);

router.post('/refreshToken', authMiddleware.refreshToken);

router.post('/logout/', authMiddleware.isLoggedIn ,authMiddleware.userLogout);

export default router;



