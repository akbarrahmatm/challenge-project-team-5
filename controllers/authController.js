require("dotenv").config();

const { User } = require("../models");
const ApiError = require("../utils/ApiError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    const { name, username, password, confirmPassword, role, storeId } =
      req.body;

    // Req body validation
    if (
      !name ||
      !username ||
      !password ||
      !confirmPassword ||
      !role ||
      !storeId
    ) {
      next(
        new ApiError(
          "name, username, password, confirmPassword, role, storeId field is required",
          400
        )
      );
      return;
    }

    // Check unique username
    const isUsernameExist = await User.findOne({
      where: {
        username,
      },
    });
    if (isUsernameExist) {
      next(new ApiError("Username is already taken", 400));
      return;
    }

    // Check password length
    const passwordLength = password <= 8;
    if (passwordLength) {
      next(new ApiError("Password should be 8 character or more", 400));
      return;
    }

    // Check password & passwordConfirm
    if (password !== confirmPassword) {
      next(new ApiError("password & confirmPassword does not match", 400));
      return;
    }

    // Check role
    const roles = ["Manager", "Staff"];
    if (!roles.includes(role)) {
      next(new ApiError("Role should be Manager or staff", 400));
      return;
    }

    // Encrypt
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await User.create({
      name,
      username,
      password: hashedPassword,
      role,
      storeId,
    });

    res.status(201).json({
      status: "Success",
      data: {
        ...newUser.dataValues,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
    return;
  }
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          name: user.name,
          role: user.role,
          storeId: user.storeId,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRES,
        }
      );

      res.status(200).json({
        status: "Success",
        message: "Token successfully created",
        data: token,
      });
    } else {
      next(new ApiError(" Wrong Email Or Password", 400));
      return;
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
    return;
  }
};

const checkUser = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "Success",
      data: {
        user: req.user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
    return;
  }
};

module.exports = {
  register,
  login,
  checkUser,
};
