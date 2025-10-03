import jwt from "jsonwebtoken";

// user authentication middleware (backward-compatible)
const authUser = async (req, res, next) => {
  try {
    // ✅ Keep your current style AND also support Authorization: Bearer <token>
    const token =
      req.headers.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Add, don't replace: only set if not already present
    if (!req.body.userId) req.body.userId = decoded.id;

    // ✅ Optional convenience for booking: pass name/email if your JWT includes them
    if (!req.body.userData) {
      req.body.userData = {
        name: decoded.name || "User",
        email: decoded.email || "",
      };
    }

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;
