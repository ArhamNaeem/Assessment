import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "express-async-errors";
import {
  incFailedAttempts,
  isBlocked,
  resetLoginAttempts,
} from "../utils/blockIP.js";

export const registerUser = async (req, res) => {
  const userData = { ...req.body };

  const salt = await bcrypt.genSalt(10);
  userData.password = await bcrypt.hash(userData.password, salt);
  const user = await User.create(userData);

  if (!user) {
    throw new BadRequestError("User could not register");
  }

  res.status(StatusCodes.CREATED).json({ success: true, user });
};

export const loginUser = async (req, res) => {
  if (isBlocked(req.ip)) {
    throw new BadRequestError("IP is currently blocked!");
  }

  const { email, password } = req.body;
  if (!email || !password) {
    incFailedAttempts(req.ip);
    setTimeout(() => {
      resetLoginAttempts(req.ip);
    }, 60 * 60 * 1000);
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    incFailedAttempts(req.ip);
    setTimeout(() => {
      resetLoginAttempts(req.ip);
    }, 60 * 60 * 1000);
    throw new NotFoundError("User not found");
  }

  const isPasswordCorrect = await user.validatePassword(password);

  if (!isPasswordCorrect) {
    incFailedAttempts(req.ip);
    setTimeout(() => {
      resetLoginAttempts(req.ip);
    }, 60 * 60 * 1000);
    throw new UnauthenticatedError("Incorrect password");
  }

  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res.status(StatusCodes.OK).json({ success: true, token });
};
