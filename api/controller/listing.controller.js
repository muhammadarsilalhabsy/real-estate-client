import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    await listing.save();
    res.status(201).json({
      statusCode: 201,
      success: true,
      msg: "Success create new listing",
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const getListing = await Listing.findById(req.params.id);

    if (!getListing) return next(errorHandler(404, "Listing not found!"));

    if (req.user.id !== getListing.userRef)
      return next(errorHandler(401, "You can only delete your own listing!"));

    try {
      await Listing.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        statusCode: 200,
        msg: `${getListing.name} listing has been deleted!`,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  try {
    const getListing = await Listing.findById(req.params.id);

    if (!getListing) return next(errorHandler(404, "Listing not found!"));

    if (req.user.id !== getListing.userRef)
      return next(errorHandler(401, "You can only update your own listing!"));

    try {
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      res.status(200).json({
        success: true,
        statusCode: 200,
        msg: `You listing has been updated!`,
        data: updatedListing,
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) return next(errorHandler(404, "Listing not found!"));

    res.status(200).json({
      success: true,
      statusCode: 200,
      msg: `Success get listing with id ${listing._id}!`,
      data: listing,
    });
  } catch (error) {
    next(error);
  }
};
