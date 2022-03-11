const express = require("express")
const authRouter = require("./routers/authRouter");
const mongoose = require("mongoose");
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()

app.use(
    cors({
        origin: '*',
        credentials: true
    })
)
app.use(express.json())

const start = () => {
    try {
        mongoose.connect('mongodb+srv://admin:admin@cluster0.e5knj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
        app.listen(PORT, () => console.log("SERVER WORK"))
    } catch (e) {
        console.log(e)
    }
}

start()