import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './Navbar';
import NoteBox from './components/NoteBox';
import CreatePage from './components/CreatePage';
import Signup from './components/Signup';
import UpdatePage from './components/UpdatePage';



function App() {
  return <>
  <Navbar /> 
  <Routes>
    <Route path="/" element={<NoteBox />} />
    <Route path="/create" element={<CreatePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/update" element={<UpdatePage />} />
  </Routes>
  </>;
}

export default App;
