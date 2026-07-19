const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
// const bodyParser = require("body-parser")
dotenv.config()

const app = express()
const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5000

// app.use(bodyParser.json({ limit: '10mb', extended: true }))
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

app.use(express.json({ limit: '10mb' }))
app.use(cors())

app.use('/', Routes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB")

        app.listen(PORT, () => {
            console.log(`Server started at port no. ${PORT}`)
        })
    } catch (err) {
        console.log("NOT CONNECTED TO NETWORK", err)
        process.exit(1)
    }
}

startServer()