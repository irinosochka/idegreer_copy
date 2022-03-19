require('dotenv').config()
const express = require("express")
const authRouter = require("./routers/authRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(cookieparser())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log("SERVER WORK"))
    } catch (e) {
        console.log(e)
    }
}

start().then(r => r)
