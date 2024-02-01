import express from 'express'
import { db } from './config/database.js'
import { authRouter } from './routes/authroutes.js'

//creating an express app
const app = express()

//Configures the express app to parse incoming json data
app.use(express.json())

db.authenticate()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Unable to connect to database", err))

app.use("/api/auth", authRouter)

app.listen(5000, () => {
    console.log(`Server is running on ${5000}`)
})
