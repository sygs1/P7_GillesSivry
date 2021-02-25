// importations
import React from 'react';
import axios from "axios"; // pour requetes
import { useDispatch } from "react-redux";


import logo from './images/logo.svg';
import './App.css';


// ---------------

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bienvenue sur le réseau social GROUPOMANIA.
        </p>
        <a
          className="App-link"
          href="https://groupomania-rs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Connectez vous
        </a>
      </header>
    </div>
  );
}

export default App;
