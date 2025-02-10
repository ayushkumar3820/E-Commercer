import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];  // ✅ Extract token correctly
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  // ✅ Verify token

      req.user = await User.findById(decoded.user.id).select("-password");  // ✅ Correct userId

      if (!req.user) {
        return res.status(401).json({ message: "User not found, authorization denied" });
      }

      next();
    } catch (err) {
      console.log("Token verification failed:", err.message);
      res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    res.status(401).json({ message: "No Authorization, no token provided" });
  }
};

const admin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized, no user found" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

export { authMiddleware, admin };
