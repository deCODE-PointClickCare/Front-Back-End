import "./App.css";
import React from "react";
import ReadmissionForm from "./ReadmissionForm.js";
import LoginPage from "./Login.js";
import { Router, Switch, Route } from "react-router-dom";
import { ChakraProvider, Box } from "@chakra-ui/react";
import history from "./history";
import Graphs from "./Graphs";

function App() {
  return (
    <ChakraProvider>
      <Box background="#F3FCFF" minHeight="100vh">
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={LoginPage} />
            <Route path="/ReadmissionForm" component={ReadmissionForm} />
            <Route path="/Graphs" component={Graphs} />
          </Switch>
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
