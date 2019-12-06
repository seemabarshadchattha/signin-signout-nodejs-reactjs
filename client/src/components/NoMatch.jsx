import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class NoMatch extends Component {
  render() {
    return (
      <div>
        <Link to="/signin" variant="body2" style={{ marginTop: "50px" }}>
          {"Page not found, Click here."}
        </Link>
      </div>
    );
  }
}

export default NoMatch;
