import { NextFunction, Request, Response } from "express";

var jwt = require("jsonwebtoken");
const JWT_SECRET = "newstringishere";

export const fetchuser = async (req: Request, res: Response, next: NextFunction) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  
  if (!token) {
    console.log("Token not found")
    res.status(401).send({ error: "Please authenticate using a valid token" });
    return;
  }


  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data)
    req.user = data.user;
    next();
    return;
  } catch (error) {
    // console.log(error)
    res.sendStatus(401).send({ error: "Please authenticate using a valid token" });
  }
};
