import { Request, Response } from "express";
import MeetingModel from "../models/meeting";
const nodemailer = require("nodemailer");


//api for meeting details
export const meetingDetails = async (req: any, res: Response) => {
  try {

    const { name, phoneNo, Email, Date, Description, Meetingtype } = req.body;

    MeetingModel.create({
      name: name,
      phoneNo: phoneNo,
      Date: Date,
      Email: Email,
      Description: Description,
      Meetingtype: Meetingtype,
    });


    res.status(200).send({ success: true });



    //mail part start here 
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER, // generated ethereal user
        pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
      },
    });

    let message = await transporter.sendMail({
      from: `"Karma Realty" <${process.env.NODEMAILER_USER}>`, //sender address
      to: Email,  //receivers
      subject: "Hello from karma", //Subject line
      text: `Hello ${name}! Thank you for your interest. Your house tour on the date ${Date} is confirmed.`,
    });

    transporter.sendMail(message, ({ error, info }: any) => {
      if (error) {
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
