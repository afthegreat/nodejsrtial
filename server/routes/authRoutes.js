import express from "express"
import {login, logout, register, deleteUsers, sendResetOtp, resetPassword,
sendVerifyOtp,verifyEmail,isAuthenticated} from "../controller/authController.js"
import userAuth from "../middleware/userAuth.js"


 const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.post('/logout', logout)
authRouter.post('/delete', deleteUsers)
authRouter.post('/sendverifyotp', userAuth, sendVerifyOtp)
authRouter.post('/verifyaccount', userAuth, verifyEmail)
authRouter.post('/isauthenticated', userAuth, isAuthenticated)
authRouter.post('/sendresetotp', userAuth, sendResetOtp)
authRouter.post('/resetpassword', userAuth, resetPassword)
export default authRouter
 