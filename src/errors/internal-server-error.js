import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class InternalServerError extends CustomError {
  statusCode;
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}

export default InternalServerError;