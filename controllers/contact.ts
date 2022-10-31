import { Request, Response } from "express";
import ContactModel from "../models/contact";

export const contactDetails = async (
  req: Request,
  res: Response
 ) => {
  try {

    const {
      name,
      inquiryType,
      phoneNo,
      email,
      inquiryDetails,
      value,
    } = req.body;


    ContactModel.create({
        name : name,
        inquiryType : inquiryType,
        phoneNo : phoneNo,
        email : email,
        inquiryDetails : inquiryDetails,
        value : value
    })
     
    res.status(200).send({success: true});
   
  } catch (error: any) {
    console.log("Error in contact : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
