import { error } from 'console';
import nodemailer from 'nodemailer'

//create transporter
export const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

//verify transporter setup
transporter.verify((error, success) =>{
    if(error) {
        console.log(error);
    }
    else{
        console.log("server is ready to take our message");
    }
});

