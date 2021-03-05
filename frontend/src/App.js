import './App.css';
import React, { useEffect, useState } from 'react';
import { ReadmissionForm } from "./ReadmissionForm.js";
import LoginPage from "./Login.js"

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"


function App() {
  return (
    <ChakraProvider>
      <LoginPage></LoginPage>
    </ChakraProvider>

//       <ReadmissionForm
// //        onNewMovie={movie =>
// //          setMovies(currentMovies => [movie, ...currentMovies])
// //        }
//       />
  );
}

export default App;
