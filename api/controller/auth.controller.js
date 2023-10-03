import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const hashPw = bcryptjs.hashSync(password, 10);
  try {
    const user = new User({ username, email, password: hashPw });
    await user.save();

    res.status(201).json({ msg: "Success create new user" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
