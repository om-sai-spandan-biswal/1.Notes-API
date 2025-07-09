import Note from "./Note";
import "./NoteBox.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function NoteBox() {
  const [notes, setNotes] = useState([]);
 const [curUsr, setCurUsr] = useState({_id : ""});
  const fetchNotes = async () => {
    try {
      const response = await axios.get("https://one-notes-api-backend.onrender.com/api/note", {
        withCredentials: true,
      });
      setNotes(response.data);
      
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };
  const fetchCurruser = async () => {
    try {
      const response = await axios.get("https://one-notes-api-backend.onrender.com/api/current-user", {
        withCredentials: true,
      });
      setCurUsr(response.data);
      {
        alert(res.data.message);
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };


  useEffect(() => {
    fetchNotes();
    fetchCurruser();
  }, []);

  return (
    <>
      <div className="note_box">
        {notes.map((note, key) => (
          <Note key={key} curUsr={curUsr} refreshNotes={fetchNotes} note={note} />
        ))}
      </div>
    </>
  );
}

export default NoteBox;
