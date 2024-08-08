require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const app = express()
const port = 3000

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", (req, res) => {
    try {
        let welcomeMessage = {
            message: "Welcome to Whater is"
        }
        res.json(welcomeMessage)
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})