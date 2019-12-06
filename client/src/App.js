import React, { Component } from "react";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact strict path="/signup">
              <Signup />
            </Route>
            <Route exact strict path="/signin">
              <Login />
            </Route>
            <Route exact strict path="/">
              <Login />
            </Route>
            <Route exact strict path="/home">
              <Home />
            </Route>
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
