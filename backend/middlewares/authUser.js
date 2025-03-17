import jwt from "jsonwebtoken";

//  user authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({success: false,message: "Not authorized login again"});
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id; //used to get the user id from the token
      next();
      
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};
export default authUser;
