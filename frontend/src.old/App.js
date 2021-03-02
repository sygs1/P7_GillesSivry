// importations
import React from 'react';
import { Button, Container } from '@material-ui/core';

//import axios from "axios"; // pour requetes ajax
//import { useDispatch } from "react-redux"; // mappage container
//import {BrowserRouter as Router, Switch } from 'react-router-dom';

const signupform = require ("./container/signup/signup");

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

        <Button color="primary">Hello World</Button>

        <div>
        
        </div>

      </header>
    </div>
  );
}

export default App;
