const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  owner : {
    type : Schema.ObjectId ,
    ref : "user"
  }
});

const Note = mongoose.model("Note", noteSchema) ;

module.exports = Note ;
