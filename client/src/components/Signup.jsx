import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { Alert } from "react-bootstrap";
const axios = require("axios");
import { Redirect } from "react-router-dom";

const classes = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}));

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      errors: "",
      success: ""
    };
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onSubmit = () => {
    if (
      this.state.firstname === "" ||
      this.state.lastname === "" ||
      this.state.password === "" ||
      this.state.email === ""
    ) {
      this.setState({
        errors: "All fields are mandatory, please fill all fields."
      });
    } else {
      const context = this;
      axios
        .post("/signup", {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          email: this.state.email,
          password: this.state.password
        })
        .then(function(response) {
          console.log(response);
          if (response.status === 201) {
            context.setState({ success: "User created successfully." });
            context.setState({
              errors: ""
            });
            context.setState({ firstname: "" });
            context.setState({ lastname: "" });
            context.setState({ email: "" });
            context.setState({ password: "" });
          } else {
            context.setState({
              errors: response.headers["response-description"]
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            console.log(error.response.headers["response-description"]);
            context.setState({
              errors: error.response.headers["response-description"]
            });
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
    }
  };
  render() {
    if (localStorage.getItem("apikey") && localStorage.getItem("username")) {
      return <Redirect to="/home" />;
    }

    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "120px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          {this.state.errors ? (
            <Alert variant="danger">{this.state.errors}</Alert>
          ) : (
            ""
          )}
          {this.state.success ? (
            <Alert variant="success">{this.state.success}</Alert>
          ) : (
            ""
          )}

          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <div style={{ marginTop: "20px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleInput}
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleInput}
                  autoComplete="lname"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleInput}
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInput}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={this.onSubmit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end" style={{ marginTop: "10px" }}>
                <Grid item>
                  <Link to="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Signup);

// export default Signup;
