import { Request, Response } from "express";
import MeetingModel from "../models/meeting";


//api for meeting details
export const meetingDetails = async (req: Request, res: Response) => {
  try {
    const { name, phoneNo, Date } = req.body;

    MeetingModel.create({
      name: name,
      phoneNo: phoneNo,
      Date:  Date,
    });

    res.status(200).send({success: true });

  } catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
