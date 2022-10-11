const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true}, () => {
    console.log('Connected to mongoose')
});

dotenv.config();

// middleware
app.use(express.json())

app.listen(8800, () => {
    console.log("Backend Server is running !!!")
})