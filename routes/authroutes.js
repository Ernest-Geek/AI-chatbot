import express from 'express'
import { loginValidator, signupValidator } from '../utils/authValidator.js'
import { login, signup } from '../controller/authController.js'

export const authRouter = express.Router()

authRouter.post("/signup", signupValidator, signup)

authRouter.post("/login", loginValidator, login)