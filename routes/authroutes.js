import express from 'express'
import { loginValidator, signupValidator } from '../utils/authValidator.js'
import { login, signup } from '../controller/authController.js'

export const authRouter = express.Router()

authRouter.post("/signup", signupValidator, signup)

authRouter.get("/login", function(req, res){
    res.sendFile(process.cwd() + "/templates/login.html")
})

authRouter.post("/login", loginValidator, login)

authRouter.post("/login", loginValidator, login)
