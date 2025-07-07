import { useLocation, useNavigate } from "react-router-dom";
import "./CreatePage.css";
import React, { useState } from "react";
import axios from "axios";


function UpdatePage() {
  const location = useLocation() ;
  const note = location.state ;

  const [formData, setFormData] = useState({
    title: note.title,
    note: note.note,
  });

  const navigate = useNavigate() ;

  const onSubmitForm = async (event) => {
    event.preventDefault() ;
    try {
          const res = await axios.put(
            `http://localhost:5000/api/note/${note._id}`,
            formData,
            {
              withCredentials: true,
            }
          );
          alert(res.data.message)
          setFormData({
            title: "",
            note: "",
          });
        } catch (error) {
          console.log(error)
        }
        navigate("/");
    
  }

  const inputHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <form className="formStyle" action="">
        <br />
        <label htmlFor="">Title</label>
        <br />
        <input
          onChange={(event) => inputHandler(event)}
          value={formData.title}
          className="form_input"
          id="title"
          name="title"
          type="text"
        />
        <br />
        <label htmlFor="">Note</label>
        <br />
        <textarea
          onChange={(event) => inputHandler(event)}
          className="form_input"
          id="title"
          value={formData.note}
          name="note"
          type="text"
        />
        <br />
        <br />
        <button onClick={(event) => onSubmitForm(event)} type="submit"  className="btn">Edit...</button>
      </form>
    </>
  );
}

export default UpdatePage;
