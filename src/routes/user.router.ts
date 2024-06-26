
import express, {Request,Response  } from "express";
import { UserControllerClass } from "../controller/index.controller";
import { AuthenticateMiddleware } from "../middleware/authmiddleware";
import { upload } from "../config/multerConfig";

const router = express.Router();
const userControllerObj = new UserControllerClass();
const authMiddleware  =  new AuthenticateMiddleware();


router.get('/getUser', userControllerObj.getAllUser);
router.get('/getStudent', userControllerObj.getAllStudent);

router.get('/:id', userControllerObj.getUserById);

router.post('/post',upload.single('image'), userControllerObj.createUser);

router.put('/updateUser/:id', authMiddleware.isLoggedIn, userControllerObj.updateUserById);

router.delete('/delete/:id', authMiddleware.isPrincipalOrTeacher, userControllerObj.deleteUserById);  

router.delete("/deleteAll", authMiddleware.isPrincipal, userControllerObj.deleteAllUser);

router.post('/login', authMiddleware.userExist, authMiddleware.userLogin);

router.post('/refreshToken', authMiddleware.refreshToken);

router.post('/logout/', authMiddleware.isLoggedIn ,authMiddleware.userLogout);

// router.post('/reset', userControllerObj.sendPasswordEmail)

export default router;



