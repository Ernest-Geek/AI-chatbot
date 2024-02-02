import { createToken } from "../middleware/createToken.js";
import { User } from "../model/user.js";
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    const { email, username, password } = req.body;

    const hashedPassword =  await bcrypt.hash(password, 10)
    if (!hashedPassword) return res.status(500).json({ message: "Internal server error"});
    
    const user = await User.create({
        email: email,
        username: username,
        password: hashedPassword
    }).then( user => {
        user.password = undefined
        createToken(user, res, 201)
    }).catch((err) => {
        console.log(err)
        res.json({
            status: "Failed",
            message: "Error creating user"
        })
    })
}

export const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username: username }})
    if (!user) return  res.status(400).json({ message: "Incorrect username or password" });

    const isAuthorised = await bcrypt.compare(password, user.password)
    if (!isAuthorised) return  res.status(400).json({ message: "Incorrect username or password" });

    user.password = undefined
    createToken(user, res, 200)
}
