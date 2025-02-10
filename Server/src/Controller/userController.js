import User from "../Models/UserModels.js";
import jwt from "jsonwebtoken";

// Function to generate tokens
const generateToken = (user, type) => {
  const payload = { user: { id: user._id, role: user.role } };

  const expiresIn = type === "idToken" ? "2h" : "7d";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const checkExistingUser = await User.findOne({ email });

    if (checkExistingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const idToken = generateToken(user, "idToken");
    const refreshToken = generateToken(user, "refreshToken");

    user.refreshToken = refreshToken;
    await user.save();

    // Set refresh token as HTTP-only cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      idToken, // Short-lived token for authentication
      refreshToken, // Long-lived token for refreshing authentication
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Refresh Token - Generates new idToken when expired
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body; // Get refreshToken from request body

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newIdToken = generateToken(user, "idToken");

    res.status(200).json({
      idToken: newIdToken,
      refreshToken, // Send the same refreshToken back
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired refresh token" });
  }
};

// Logout User
const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.refreshToken = "";
      await user.save();
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { register, login, refreshAccessToken, logout };
