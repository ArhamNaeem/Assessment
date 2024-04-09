import { StatusCodes } from "http-status-codes";
import CustomError from "./custom-error.js";


class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
    Object.setPrototypeOf(this,NotFoundError.prototype)
  }
}
 export default NotFoundError