import './App.css';
import React, { useEffect, useState } from 'react';
import ReadmissionForm  from "./ReadmissionForm.js";
import LoginPage from "./Login.js"
import { Router, Switch, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react"
import history from './history';

function App() {
  return (
    <ChakraProvider>
      <Router history={history}>
        <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/ReadmissionForm" component={ReadmissionForm} />
        </Switch>
      </Router>
    </ChakraProvider>


    //       <ReadmissionForm
    // //        onNewMovie={movie =>
    // //          setMovies(currentMovies => [movie, ...currentMovies])
    // //        }
    //       />
  );
}

export default App;
