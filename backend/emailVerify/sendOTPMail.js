import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

export async function sendOTPMail(otp,email)
{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.MAIL_USER,
            pass:process.env.MAIL_PASS
        }
    })//info about transporter who are sending the email 

    const emailContent={
        from:process.env.MAIL_USER,
        to:email,
        subject:"OTP for Password Reset",
        html:`<p>Your OTP for Password Reset is:<b>${otp}</b></p>`
    }//email content 

    transporter.sendMail(emailContent,(err,info)=>{
        if(err)
        {
            throw new Error(err);
        }
        console.log("Error while sending the otp on mail",err);
        console.log(info)
    })
}