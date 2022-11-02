import { Request, Response } from "express";
import MeetingModel from "../models/meeting";
import UserModel from "../models/User";
const nodemailer = require("nodemailer");


//api for meeting details
export const meetingDetails = async (req: any, res: Response) => {
  try {

    const { name, phoneNo, Date } = req.body;

    let userId = req.user.id;
 
    let isUser = await UserModel.findById(userId);

    let email = isUser?.email


    MeetingModel.create({
      name: name,
      phoneNo: phoneNo,
      Date: Date,
    });


    res.status(200).send({ success: true });

  
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
      to: email,  //receivers
      subject: "Hello from karma", //Subject line
      text: `Hello ${name} this mail is from karma reality thanks for contacting us we will meet at ${Date}`, 
    });

    console.log(message)


    transporter.sendMail(message,({error,info} : any) => {
       if (error){
         return console.log(error);
       }
       console.log('message sent : %s', info.messageId);
       console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
    });

  } catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
