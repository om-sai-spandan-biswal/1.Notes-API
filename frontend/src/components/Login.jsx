import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        formData,
        {
          withCredentials: true,
        }
      );
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error)
    }
    navigate("/");
  };

  const inputHandler = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name] : event.target.value,
    }));
  };

  return (
    <>
      <form className="formStyle">
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          onChange={(event) => inputHandler(event)}
          value={formData.email}
          className="form_input"
          id="email"
          name="email"
          type="email"
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={(event) => inputHandler(event)}
          className="form_input"
          value={formData.password}
          id="password"
          name="password"
          type="password"
        />
        <br />
        <br />
        <button
          onClick={(event) => onSubmitForm(event)}
          type="submit"
          className="btn"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
