import User from "../models/User.js"
import {StatusCodes} from 'http-status-codes'
import "express-async-errors";


export const getAllUsers = async (req,res)=>{
    const users = await User.find({})
    res.status(StatusCodes.OK).json({success:true,users})
}