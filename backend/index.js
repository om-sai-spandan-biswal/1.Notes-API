const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors") ;
require("dotenv").config();
const port = process.env.PORT;
const mongoURL = process.env.MONGO_URL;
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");
const worpAsync = require("./utility/worpAsync");
const Note = require("./models/note");
const User = require("./models/user");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/note");
app.use(cors({origin : "http://localhost:5173" ,credentials : true})) ;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api/note",noteRouter) ;

app.get("/api/current-user", verifyToken, (req, res) => {
  res.status(200).json(req.user);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Somthing is Wrong" } = err;
  res.status(status).json({ message: message });
});

app.listen(port, () => {
  mongoose.connect(mongoURL);
  console.log(`App is Listening at PORT : ${port}`);
  console.log("Connected to DB");
});


// filter.content = { $regex: search, $options: 'i' };
