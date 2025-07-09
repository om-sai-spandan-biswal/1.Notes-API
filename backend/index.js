const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors") ;
require("dotenv").config();
const port = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;
const verifyToken = require("./middleware/verifyToken");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const noteRouter = require("./routes/note");
app.use(cors({origin : "https://one-notes-api-frontend.onrender.com" ,credentials : true})) ;


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
