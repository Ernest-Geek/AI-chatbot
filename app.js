import express from 'express'
import { db } from './config/database.js'

const app = express()

app.use(express.json())

db.authenticate()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Unable to connect to database", err))

app.listen(5000, () => {
    console.log(`Server is running on ${5000}`)
})