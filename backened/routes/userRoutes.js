import express from "express"

import { registerUser, loginUser } from "../controller/userController.js";
import { forgotPassword, resetPassword } from "../controller/resetPasswordContyroller.js";

const userRouter = express.Router() ;

userRouter.post("/register", registerUser) ;
userRouter.post("/login", loginUser) ;

userRouter.post('/forgot-password',forgotPassword) ;
userRouter.post('/reset-password/:token',resetPassword) ;

export default userRouter ;
