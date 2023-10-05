import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;

  const hashPw = bcryptjs.hashSync(password, 10);
  try {
    const user = new User({ username, email, password: hashPw });
    await user.save();

    res
      .status(201)
      .json({ statusCode: 201, success: true, msg: "Success create new user" });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return next(errorHandler(404, "User not found!"));

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid)
      return next(errorHandler(401, "Please double check your credential"));

    const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
    const { password: pass, ...data } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ statusCode: 200, success: true, data });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};

export const googleOauth = async (req, res, next) => {
  const { email, name, photo } = req.body;

  try {
    const user = await User.findOne({ email });

    // if email already exsist get the data
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
      const { password: pass, ...data } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ statusCode: 200, success: true, data });
    } else {
      // otherwise create a new user to database
      const password =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashPw = bcryptjs.hashSync(password, 10);

      try {
        const username =
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4);

        const user = new User({ username, email, password: hashPw, photo });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_TOKEN);
        const { password: pass, ...data } = user._doc;
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json({ statusCode: 200, success: true, data });
      } catch (error) {
        next(errorHandler(500, error.message));
      }
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
