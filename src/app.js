const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/routes")




app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use("/", routes)
mongoose.connect("mongodb://localhost:27017/pics",{useNewUrlParser:true})




module.exports = app;