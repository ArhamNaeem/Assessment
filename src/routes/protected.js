import express from 'express'
import { getAllUsers } from '../controllers/protected.js'
const protectedRouter = express.Router()

protectedRouter.get('/', getAllUsers)


export default protectedRouter