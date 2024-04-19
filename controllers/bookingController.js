const { Booking } = require("../models");
const ApiError = require("../utils/ApiError")

const findBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();
    res.status(200).json({
      status: "Success",
      data: {
        bookings,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findBookingById = async (req, res, next) => {
  try {
    const bookings = await Booking.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        bookingss,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createBooking = async (req, res, next) => {
  const { customerId, packageId, bookingDate, numberOfPeople } = req.body

  try {
    const newBooking = await Booking.create({
      customerId,
      packageId,
      bookingDate,
      numberOfPeople,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newBooking,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateBooking = async (req, res, next) => {
  const { customerId, packageId, bookingDate, numberOfPeople } = req.body;
  try {
    await Booking.update(
      {
        customerId,
        packageId,
        bookingDate,
        numberOfPeople,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "Success Update Booking",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const bookings = await Booking.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!bookings) {
      next(new ApiError("Booking id tersebut gak ada", 404));
    }

    await bookings.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "succes delete booking",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};


module.exports = {
  findBookings,
  findBookingById,
  createBooking,
  updateBooking,
  deleteBooking
};