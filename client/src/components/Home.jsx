import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggin: false
    };
  }

  static getDerivedStateFromProps() {
    if (localStorage.getItem("apikey") && localStorage.getItem("username")) {
      return {
        isLoggin: true
      };
    }
    return null;
  }

  logout = () => {
    localStorage.clear();
    this.setState({ isLoggin: false });
  };

  render() {
    if (this.state.isLoggin) {
      return (
        <div>
          <div style={{ marginTop: "100px" }}>
            <h1>User Login Successfully..!!</h1>
          </div>
          <div>
            <Button variant="contained" color="primary" onClick={this.logout}>
              Logout
            </Button>
          </div>
        </div>
      );
    } else {
      return <Redirect to="/signin" />;
    }
  }
}

export default Home;
