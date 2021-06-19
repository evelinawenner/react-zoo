import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Animals } from "./components/Start";
import { SingleAnimal } from "./components/SingleAnimal";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/">
          <Animals></Animals>
        </Route>
        <Route exact path="/animal/:id">
          <SingleAnimal></SingleAnimal>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
