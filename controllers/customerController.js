const { Customer } = require("../models");
const ApiError = require("../utils/ApiError")

const findCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json({
      status: "Success",
      data: {
        customers,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findCustomerById = async (req, res, next) => {
  try {
    const customers = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      data: {
        customers,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateCustomer = async (req, res, next) => {
  const { name, address, email, phoneNumber } = req.body;
  try {
    await Customer.update(
      {
        name,
        address,
        email,
        phoneNumber,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: "Success",
      message: "sukses update customer",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const customers = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!customers) {
      next(new ApiError("Customer id tersebut gak ada", 404));
    }

    await customers.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "Success",
      message: "sukses delete customer",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const createCustomer = async (req, res, next) => {
  const { name, address, email, phoneNumber } = req.body

  try {
    const newCustomer = await Customer.create({
      name,
      address,
      email,
      phoneNumber,
    });

    res.status(200).json({
      status: "Success",
      data: {
        newCustomer,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findCustomers,
  findCustomerById,
  updateCustomer,
  deleteCustomer,
  createCustomer
};
