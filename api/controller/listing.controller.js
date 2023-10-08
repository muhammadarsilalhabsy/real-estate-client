import Listing from "../models/listing.model.js";

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
