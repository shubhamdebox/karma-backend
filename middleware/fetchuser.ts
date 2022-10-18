var jwt = require("jsonwebtoken");
const JWT_SECRET = "newstringishere";

export const fetchuser = async (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("auth-token");
  
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }


  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data)
    req.user = data.user;
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
};
