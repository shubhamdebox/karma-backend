import bcrypt from "bcryptjs";
import UserModel from "../models/User";
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "newstringishere";

//Signup routes
export const UserSignup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

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

//Login routes
// export const UserLogin = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;

//     let user = await UserModel.findOne({ email });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ error: "Please try to login with correct credentials" });
//     }

//     const passwordCompare = await bcrypt.compare(password, user.password);

//     if (!passwordCompare) {
//       return res.status(400).json({error: "Please try to login with correct credentials"});
//     }else{
//         res.json({ success: true});
//     }

//   } catch (error: any) {
//     console.log("Error in meeting : ", error.toString());
//     res
//       .sendStatus(500)
//       .json({ error: "Something went wrong, please try again later" });
//     return;
//   }
// };

export const UserLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    let user = await UserModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      return res
        .status(400)
        .json({ error: "Please try to login with correct credentials" });
    }

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

export const GetUser = async (req: Request, res: Response) => {
  try {
     
    
    let userId = req.user.id;
    
    const user = await UserModel.findById(userId).select("-password");
    res.send(user);

  } catch (error: any) {

    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
};
