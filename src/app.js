import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userAuthRouter from "./routes/user-auth.js"
import {connectDB} from './config/connectDB.js'
import protectedRouter from "./routes/protected.js";
import { user_authentication } from "./middleware/auth.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import rateLimit from 'express-rate-limit'
const app = express()


const usersLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 100, 
  message: 'Too many requests.',
});



const loginAttempts = new Map(); 



app.use(express.json())

app.use('/api/v1/user',usersLimiter,userAuthRouter)

app.use('/api/v1/protected',user_authentication, protectedRouter)

app.use(errorHandlerMiddleware)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

(async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(3000, () =>
        console.log(`Listening on port 3000...`)
      );
    } catch (error) {
      console.log(error);
    }
})()