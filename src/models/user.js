import mongoose, { Schema } from "mongoose";
import EmailExistsError from "../errors/index.js";
import bcrypt from 'bcrypt'
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

UserSchema.methods.validatePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};
UserSchema.pre("save", async function () {
  const emailExists = await User.exists({ email: this.email });

  if (emailExists) {
    throw new EmailExistsError("Email already exists");
  }
});



const User = mongoose.model("User", UserSchema);

export default User;
