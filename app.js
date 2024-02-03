import express from 'express'
import { db } from './config/database.js'
import { authRouter } from './routes/authroutes.js'
import bodyParser from 'body-parser'

//creating an express app
const app = express()

//Configures the express app to parse incoming json data
app.use(express.json())
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: false }))

db.authenticate()
.then(() => console.log("Database connected successfully"))
.catch((err) => console.log("Unable to connect to database", err))

app.get("/", function(req, res){
    res.sendFile(process.cwd() + "/templates/base.html")
})

app.use("/api/auth", authRouter)

app.listen(5000, () => {
    console.log(`Server is running on ${5000}`)
})
