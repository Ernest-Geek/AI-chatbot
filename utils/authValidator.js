import { body } from "express-validator";
import { User } from "../model/user.js";
import { validatorResult } from "../middleware/validator.js";

export const signupValidator = [
    body('email')
    .notEmpty().withMessage("Please enter an email")
    .isEmail().withMessage("Please enter a valid email")
    .custom(async (value, { req }) => {
        const isUsed = await User.findOne({ where: { email: value }})
        if (isUsed) throw new Error("User with email already exists")
        return value
    }),
    body('username')
    .notEmpty().withMessage("Please enter a username")
    .custom(async (value, { req }) => {
        const isUsed = await User.findOne({ where: { username: value }})
        if (isUsed) throw new Error("User with username already exists")
        return value
    }),
    body('password')
    .notEmpty().withMessage("Password cannot be empty")
    .isLength({ min: 5 }).withMessage("Length of password should be 5 or more"),
    body('confirmPassword')
    .notEmpty().withMessage("Password cannot be empty")
    .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match")
        }
        return value;
    }),
    validatorResult
]

export const loginValidator = [
    body('username')
    .notEmpty()
    .withMessage(`Username cannot be empty`),
    body('password')
    .notEmpty()
    .withMessage("Password cannot be empty"),
    validatorResult
]