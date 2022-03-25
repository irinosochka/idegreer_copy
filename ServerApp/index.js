require('dotenv').config()
const express = require("express")
const authRouter = require("./routers/authRouter");
const courseRouter = require("./routers/courseRouter");
const userRouter = require("./routers/userRouter");
const imageRouter = require("./routers/imageRouter");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth', authRouter)
app.use('/course', courseRouter)
app.use('/user', userRouter)
app.use('/', imageRouter)

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
