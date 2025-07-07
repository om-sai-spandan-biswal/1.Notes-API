import React from "react";
import "./Note.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Note({ note,refreshNotes }) {
  let navigate = useNavigate() ;
  const deletingNote = async (event) => {
    event.preventDefault()
    try {
      console.log("ok")
      const res =  await axios.delete(`http://localhost:5000/api/note/${note._id}`, {
      withCredentials: true,
    });
    {alert(res.data.message)}
    } catch (error) {
        console.log(`Error is ${error}`)
    }
    refreshNotes()
    navigate("/")
  };

  const updateNote = async (event) => {
    event.preventDefault() ;
    navigate("/update", {state : note}) ;
  }
  return (
    <div className="note">
      <div>
        {" "}
        <h5>{note.title}</h5>
        <p>{note.note}</p>
        <p>
          (:) <i>{note.owner["username"]}</i>
        </p>
      </div>
      <div>
        {" "}
        <form onSubmit={(event) => {updateNote(event)}} className="form_btn">
          <button type="submit">Edit</button>
        </form>
        <form onSubmit={(event) => {deletingNote(event)}} className="form_btn">
          <button type="submit">Delete</button>
        </form>
      </div>
    </div>
  );
}

export default Note;