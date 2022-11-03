import { Request, Response } from "express";
import MeetingModel from "../models/meeting";
const nodemailer = require("nodemailer");


//api for meeting details
export const meetingDetails = async (req: any, res: Response) => {
  try {

    const { name, phoneNo , Email ,  Date , Description } = req.body;

    MeetingModel.create({
      name: name,
      phoneNo: phoneNo,
      Date: Date,
      Email : Email,
      Description : Description,
    });


    res.status(200).send({ success: true });

  

    //mail part start here 
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "shubham@debox.co.in", // generated ethereal user
        pass: "dlbzsidtvuvikbeq", // generated ethereal password
      },
    });

    let message = await transporter.sendMail({
      from: '"Karma reality" <shubham@debox.co.in>', //sender address
      to: Email,  //receivers
      subject: "Hello from karma", //Subject line
      text: `Hello ${name} this mail is from karma reality thanks for contacting us we will meet at ${Date}`, 
    });

    transporter.sendMail(message,({error,info} : any) => {
       if (error){
         return console.log(error);
       }
       console.log('message sent : %s', info.messageId);
       console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
    });

  } 
  catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
