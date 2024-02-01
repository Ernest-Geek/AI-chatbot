import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const createToken = (user, res, statusCode) => {
    const token = jwt.sign({ _id : user.id }, process.env.PRIVATEKEY)

    res.cookie('Bearer', token, {
        httpOnly: true,
        secure: true
    })

    
    res.status(statusCode).json({
        status: "Success",
        user: user
    })
}

export const verifyToken = (req, res, next) => {
    const token = req.cookies.Bearer;

    const decoded = jwt.verify(token, process.env.PRIVATEKEY, (err, acc) => {
        if (err) {
            res.status(401).json({
                status: "Failed",
                message: "User is not logged in"
            })
        }

        req.user = acc;
        next()
    })
}