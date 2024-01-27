import express from 'express'

const app = express

app.request(express.json())

app.listen(5000, () => {
    console.log(`Server is running on ${5000}`)
})