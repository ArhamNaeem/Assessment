import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";

class EmailExistsError extends CustomError {
    constructor(message) {
      super(message);
      this.statusCode = StatusCodes.CONFLICT;
      Object.setPrototypeOf(this, EmailExistsError.prototype);
    }
  }


export default EmailExistsError