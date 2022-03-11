const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

const startApp = () => {
    try {
        mongoose.connect('mongodb+srv://admin:admin@cluster0.e5knj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log("SERVER WORK"))
    } catch(e) {
        console.log(e);
    }
}

startApp();
