import express from "express";
import { loginUser, registerUser } from "../controllers/user-auth.js";

const userAuthRouter = express.Router()


userAuthRouter.post('/register',registerUser)

userAuthRouter.post('/login',loginUser)

export default userAuthRouter
