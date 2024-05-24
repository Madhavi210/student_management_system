
import express, {Request,Response  } from "express";
import { notificationControllerClass } from "../controller/index.controller";

const router = express.Router();
const notifControllerClass = new notificationControllerClass();

router.get('/', notifControllerClass.getAllNotification);

router.get('/:id', notifControllerClass.getNotificationById);

router.post('/post', notifControllerClass.createNotification);

router.put('/updateNotification/:id', notifControllerClass.updateNotificationById);

router.delete('/delete/:id', notifControllerClass.deleteNotificationById);  

router.delete("/deleteAll", notifControllerClass.deleteAllNotification);

export default router;

