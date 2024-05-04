import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export async function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({});
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ token });
  } catch (error) {
    next(error);
  }
}

export async function signUp(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({});
  }

  try {
    const user = new User({ email, password });
    await user.save();

    res.status(201).json({});
  } catch (error) {
    next(error);
  }
}
