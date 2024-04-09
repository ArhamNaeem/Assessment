import express from "express";
import jwt from "jsonwebtoken";
import UnauthenticatedError from "../errors/unauthenticated.js"
import InternalServerError from "../errors/internal-server-error.js";
import BadRequestError from "../errors/bad-request.js";
import User from "../models/User.js";

export const user_authentication = async (
  req,
  res,
  next
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authorization invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    if (!process.env.JWT_SECRET) {
      throw new InternalServerError("JWT_SECRET must be set");
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = payload.exp;
    if (currentTimestamp > expirationTimestamp) {
      throw new UnauthenticatedError("JWT token expired");
    }

    const user = await User.findById(payload.userId).select("-password");
    if (!user) {
      throw new BadRequestError("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      throw new UnauthenticatedError("JWT token expired");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new UnauthenticatedError("Invalid JWT token");
    } else {
      throw new UnauthenticatedError("Authorization invalid");
    }
    
  }
};
