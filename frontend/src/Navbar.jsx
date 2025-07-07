import React from 'react';
import "./Navbar.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const logoutReq = async (event) => {
   try {
     event.preventDefault() ;
     const res = await axios.post("https://one-notes-api-backend.onrender.com/api/logout",[],{withCredentials : true}) ;
     alert(res.data.message)
   } catch (error) {
    console.log(error) ;
   }
  }
    return ( <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><img className='image-set' src="Logo.png" alt="Logo" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link" to="/create">Create</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <form  onSubmit={(event) => logoutReq(event)}>
            <button className='formBtn' type='submit'>Logout</button>
          </form>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav> );
}

export default Navbar;