const express = require("express") ;
const mongoose = require("mongoose");
const app = express() ;
require('dotenv').config()
const port = process.env.PORT ;
const mongoURL = process.env.MONGO_URL ;
const jwtSecrate = process.env.JWT_SECRET_KEY ;
const User = require("./models/user") ;

const bcrypt = require("bcrypt") ;
const jwt = require("jsonwebtoken") ;
const cookieParser = require("cookie-parser");

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get("/",(req,res) => {
    res.send("Recived")
})

app.post("/api/signup",async (req,res) => {
    try{
            let userData = req.body ;
    const newPass = await bcrypt.hash(userData.password,10) ;
    const newUser = {...userData,password : newPass} ;
    console.log(newUser) ;
    const creatredUser = await User.create(newUser) ;
    const token =jwt.sign({email : newUser["email"]},jwtSecrate) ;
    console.log(token)
    res.cookie("token",token) ;
    res.status(200).json(creatredUser)
    } catch(err) {
        res.status(500).json({error : err.message}) ;
    }
})


app.listen(port,() => {
    mongoose.connect(mongoURL)
    console.log(`App is Listening at PORT : ${port}`) ;
    console.log("Connected to DB")
})
