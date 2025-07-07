import Note from "./Note";
import "./NoteBox.css";
import axios from "axios";
import React, { useState, useEffect } from "react";

function NoteBox() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/note", {
        withCredentials: true,
      });
      setNotes(response.data);
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <div className="note_box">
        {notes.map((note, key) => (
          <Note key={key} refreshNotes={fetchNotes} note={note} />
        ))}
      </div>
    </>
  );
}

export default NoteBox;
