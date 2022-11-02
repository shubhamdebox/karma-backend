import { Request, Response } from "express";
import ContactModel from "../models/contact";
import UserModel from "../models/User";

export const contactDetails = async (
  req: any,
  res: Response
 ) => {
  try {

    const {
      name,
      inquiryType,
      phoneNo,
      inquiryDetails,
      value,
      email,
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
   
  } 
  catch (error: any) {
    console.log("Error in contact : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};
