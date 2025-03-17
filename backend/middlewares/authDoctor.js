import jwt from "jsonwebtoken";

//  user authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      return res.json({
        success: false,
        message: "Not authorized login again",
      });
    }
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
    req.body.docId = token_decode.id; //used to get the user id from the token
    next();
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};
export default authDoctor;
