
import express, {Request,Response  } from "express";
import { NotificationControllerClass } from "../controller/index.controller";

const router = express.Router();
const notifControllerClass = new NotificationControllerClass();

router.get('/', notifControllerClass.getAllNotification);

router.get('/:id', notifControllerClass.getNotificationById);

router.post('/post', notifControllerClass.createNotification);

router.put('/updateNotification/:id', notifControllerClass.updateNotificationById);

router.delete('/delete/:id', notifControllerClass.deleteNotificationById);  

router.delete("/deleteAll", notifControllerClass.deleteAllNotification);

router.post('/notify', notifControllerClass.notifyUser);

export default router;


