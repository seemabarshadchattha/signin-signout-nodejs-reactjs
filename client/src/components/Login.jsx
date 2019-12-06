import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
const axios = require("axios");
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

const classes = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errors: ""
    };
  }

  loginSuccess = params => {
    const { apikey, username } = params;
    localStorage.setItem("apikey", apikey);
    localStorage.setItem("username", username);
    this.setState({ username: "" });
    this.setState({ password: "" });
  };

  onSubmit = () => {
    if (this.state.username === "" || this.state.password === "") {
      this.setState({ errors: "Username and password are required." });
    } else {
      const context = this;
      axios
        .post("/signin", {
          username: this.state.username,
          password: this.state.password
        })
        .then(function(response) {
          if (response.status === 200) {
            console.log("response");
            console.log(response);
            context.loginSuccess(response.data);
          } else {
            console.log("response");
            console.log(response);
            context.setState({
              errors: response.headers["response-description"]
            });
          }
        })
        .catch(function(error) {
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

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if (localStorage.getItem("apikey") && localStorage.getItem("username")) {
      return <Redirect to="/home" />;
    }

    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "100px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          {this.state.errors ? (
            <Alert variant="danger">{this.state.errors}</Alert>
          ) : (
            ""
          )}
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Email Address"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={this.handleInput}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={this.handleInput}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.onSubmit}
            >
              Sign In
            </Button>
            <Grid container style={{ marginTop: "10px" }}>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(classes)(Login);
