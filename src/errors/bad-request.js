import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;