import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own profile"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const update = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );

    const { password, ...data } = update._doc;
    res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Success update profile",
      data: { ...data, token: req.body.token },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account"));

  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Success deleted your account!",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can view your own listing"));

  try {
    const userListing = await Listing.find({ userRef: req.params.id });

    res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Success get all listings",
      data: userListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      statusCode: 200,
      msg: "Success get user",
      data: rest,
    });
  } catch (error) {
    next(error);
  }
};
