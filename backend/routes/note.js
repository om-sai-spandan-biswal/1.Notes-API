const express = require("express") ;
const router = express.Router() ;
const User = require("../models/user");
const Note = require("../models/note");
const worpAsync = require("../utility/worpAsync");
const verifyToken = require("../middleware/verifyToken");

require("dotenv").config()

//Read
router.get("/",worpAsync(async (req,res) => {
  const notes = await Note.find() ;
  const data = await Promise.all(notes.map((note) => (note.populate("owner")))) ;
  res.status(200).json(data)
}))

//Updata
router.put(
  "/:id",
  verifyToken,
  worpAsync(async (req, res) => {
    const { id } = req.params;
    const oldNote = await Note.findById(id);
    if (oldNote == null || undefined) {
      res.status(412).json({message : "Note is NOT exist on database"}) ;
    }
      const mainUser = await User.findById(oldNote["owner"]);
      const crrUser = req.user;
      const newNote = req.body;
      if(crrUser["email"] == mainUser["email"]) {
        await Note.findByIdAndUpdate(id,newNote) ;
        res.status(200).json({message : "Updated successfully"})
      }else{
        res.status(200).json({message : "You are NOT owner of this note"}) ;
      }
  })
);

//Delete
router.delete(
  "/:id",
  verifyToken,
  worpAsync(async (req, res) => {
    const { id } = req.params;
    const oldNote = await Note.findById(id);
    if (oldNote == null || undefined) {
      res.status(412).json({message : "Note is NOT exist on database"}) ;
    }
      const mainUser = await User.findById(oldNote["owner"]);
      const crrUser = req.user;
      const newNote = req.body;
      if(crrUser["email"] == mainUser["email"]) {
        await Note.findByIdAndDelete(id,newNote) ;
        res.status(200).json({message : "Deleted successfully"})
      }else{
        res.status(200).json({message : "You are NOT owner of this note"}) ;
      }
  })
);

//Create
router.post(
  "/create",
  verifyToken,
  worpAsync(async (req, res) => {
    const noteData = { ...req.body, owner: req.user["_id"] };
    const createdNote = await Note.create(noteData);
    res.status(200).json(createdNote);
  })
);

//find
router.post("/find", worpAsync(async (req,res) => {
  const search = req.body["search"] ;
  if (search != nu/api/notell || undefined) {
    const regex = new RegExp(search, "i") ;
    const data = await Note.find({note : { $regex: regex }})
    res.status(200).json(data)
  } else {
    res.status(404).json({message : "Not search found"})
  }
  
}))

module.exports = router ;