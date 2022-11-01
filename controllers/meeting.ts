import { Request, Response } from "express";
import MeetingModel from "../models/meeting";
const nodemailer = require("nodemailer");


//api for meeting details
export const meetingDetails = async (req: Request, res: Response) => {
  try {
    const { name, phoneNo, Date } = req.body;

    MeetingModel.create({
      name: name,
      phoneNo: phoneNo,
      Date: Date,
    });


    // let transporter = nodemailer.createTransport({
    //   host: "mail.google.com",
    //   port: 587,
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: "shubham@debox.co.in", // generated ethereal user
    //     pass: "shubham@123", // generated ethereal password
    //   },
    //   tls:{
    //     rejectUnauthorized:false
    //   }
    // });

    


    // let message = await transporter.sendMail({
    //   from: '"Karma reality" <shubham@debox.co.in>', // sender address
    //   to: "shubhamsurve704@gmail.com",  // receivers
    //   subject: "Hello from karma", //Subject line
    //   text: `Hello ${name} this mail is from karma realtiy tnks for contacting us`, //plain text body
    //   // html: "<b>Hello world?</b>", //html body
    // });

    // console.log(message)


    // transporter.sendMail(message,({error,info} : any) => {
    //    if (error){
    //      return console.log(error);
    //    }
    //    console.log('message sent : %s', info.messageId);
    //    console.log('Preview URL : %s', nodemailer.getTestMessageUrl(info));
    // });


    res.status(200).send({ success: true });

  } catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
