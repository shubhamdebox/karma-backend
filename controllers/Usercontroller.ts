import bcrypt from "bcryptjs";
import UserModel from "../models/User";
let jwt = require("jsonwebtoken");
import { Request, Response } from "express";

const JWT_SECRET = "newstringishere";

//create a new user
export const userSignup = async (req: Request, res: Response) => {
  try {
    const { email, password }: any = req.body;

    let user = await UserModel.findOne({ email: email });

    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    user = await UserModel.create({
      email: email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id,
      },
    };

    const authtoken = jwt.sign(data, JWT_SECRET);

    res.json({ authtoken });
  } catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .sendStatus(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

// Authencticate using authtoken / login
export const userLogin = async (req: any, res: Response) => {
  try {
    const { email, password }: any = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    //creating password using bcryptjs
    const passwordCompare  = await bcrypt.compare(password, user.password);

    //if not password then throw error
    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    //creating a data to convert it in auth token
    const data = {
      user: {
        id: user.id,
      },
    };

    //create a new auth token
    const authtoken = jwt.sign(data, JWT_SECRET);
    let success = true;
    res.json({ success, authtoken });
  } catch (error: any) {
    console.log("Error in meeting : ", error.toString());
    res
      .status(500)
      .json({ error: "Something went wrong, please try again later" });
    return;
  }
};

// To loggin using auth token
export const getUser = async (req: any, res: Response) => {
  try {
    let userId = req.user.id;
    const user = await UserModel.findById(userId).select("-password");
    res.send(user);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//Adding house inside userdatabase
export const addHouse = async (req: any, res: Response) => {
  try {
    const { houseid } = req.body;
    let userId = req.user.id;
    let isUser = await UserModel.findById(userId);

    if (!isUser) {
      return res.status(404).send(" user Not Found");
    }

    let updated = await UserModel.updateOne(
      { _id: userId },
      { $addToSet: { rooms: houseid } }
    );

    let data = await UserModel.find({ _id: userId });

    res.json(data[0].rooms);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//Removing house from the user database....
export const removeHouse = async (req: any, res: Response) => {
  try {
    const { houseid }: any = req.body;

    let userId = req.user.id;

    let isUser = await UserModel.findById(userId);

    if (!isUser) {
      return res.status(404).send(" user Not Found");
    }

    let removed = await UserModel.updateOne(
      { _id: userId },
      { $pull: { rooms: houseid } }
    );

    let data = await UserModel.find({ _id: userId });

    res.json(data[0].rooms);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};

//Getting like-house from the database......
export const getlikedhouses = async (req: any, res: Response) => {
  try {
    let userId = req.user.id;

    let isUser = await UserModel.findById(userId);

    if (!isUser) {
      return res.status(404).send(" user Not Found");
    }

    let data = await UserModel.find({ _id: userId });

    res.json(data[0].rooms);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
