import express from "express"
import {login, logout, register, deleteUsers} from "../controller/authController.js"

 const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/delete', deleteUsers)

export default authRouter
 