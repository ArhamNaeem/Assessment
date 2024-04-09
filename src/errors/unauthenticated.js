import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";


class UnauthenticatedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
    Object.setPrototypeOf(this,UnauthenticatedError.prototype)
  }
}

export default UnauthenticatedError