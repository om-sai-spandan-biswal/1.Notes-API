const data = require("./data") ;
const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;
const worpAsync = require("../utility/worpAsync");
const Note = require("../models/note");

app.get("/api/init",worpAsync(async (req, res) => {
    await Note.deleteMany() ;
    const newData = data.map(el => {
        return { ...el,owner: "686b6a729640ab136058b444"}
    }) 
    await Note.insertMany(newData) ;
    res.send("Ok")

}))


app.listen(port, () => {
  mongoose.connect(mongoURL);
  console.log(`App is Listening at PORT : ${port}`);
  console.log("Connected to DB");
});

