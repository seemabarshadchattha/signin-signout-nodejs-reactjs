const User = require("../modals/User");
const random = require("random");
const uuidv1 = require("uuid/v1");
const bcrypt = require("bcrypt");

module.exports = function(app) {
  app.post("/signup", function(req, res) {
    console.log(req.body);
    const { body } = req.body;
    const { firstname, lastname, email, password } = req.body;

    if (!firstname) {
      res.setHeader("response-description", "First name is required.");
      res.statusCode = 400;
      res.end();
    } else if (!lastname) {
      res.setHeader("response-description", "Last name is required.");
      res.statusCode = 400;
      res.end();
    } else if (!email) {
      res.setHeader("response-description", "Email is required.");
      res.statusCode = 400;
      res.end();
    } else if (!password) {
      res.setHeader("response-description", "Password is required.");
      res.statusCode = 400;
      res.end();
    } else {
      User.findOne({
        where: { email: email.toLowerCase() }
      })
        .then(function(repoUser) {
          if (repoUser) {
            res.setHeader(
              "response-description",
              "Email already register in system."
            );
            res.statusCode = 400;
            res.end();
          } else {
            bcrypt.hash(password, 10, function(err, hash) {
              // Store hash in your password DB.
              if (err) {
                console.log(err);
                res.setHeader(
                  "response-description",
                  "Oops, something went wrong #1200."
                );
                res.statusCode = 500;
                res.end();
              } else {
                User.create({
                  userid: random.int(1, 1000) * 10 + 1000,
                  firstname: firstname,
                  lastname: lastname,
                  email: email.toLowerCase(),
                  password: hash,
                  apikey: uuidv1()
                })
                  .then(function(repoUsers) {
                    res.statusCode = 201;
                    res.end();
                  })
                  .catch(function(err) {
                    console.log(err);
                    res.setHeader(
                      "response-description",
                      "Oops, something went wrong #121."
                    );
                    res.statusCode = 500;
                    res.end();
                  });
              }
            });
          }
        })
        .catch(function(err) {
          console.log(err);
          res.setHeader(
            "response-description",
            "Oops, something went wrong #1240."
          );
          res.statusCode = 500;
          res.end();
        });
    }
  });

  app.post("/signin", function(req, res) {
    //  var userName = req.header("Authorization").split(':')[0];
    //  var apiKey = req.header("Authorization").split(':')[1];
    console.log(req.body);
    const { username, password } = req.body;
    if (!username) {
      res.setHeader("response-description", "User name is required.");
      res.statusCode = 400;
      res.end();
    } else if (!password) {
      res.setHeader("response-description", "Password is required.");
      res.statusCode = 400;
      res.end();
    } else {
      User.findOne({
        where: { email: username.toLowerCase() }
      })
        .then(function(repoUser) {
          if (repoUser) {
            bcrypt.compare(password, repoUser.password, function(err, result) {
              // res == true
              if (result == true) {
                console.log("User login success.");
                res.statusCode = 200;
                res.json({
                  apikey: repoUser.apikey,
                  username: repoUser.email
                });
              } else {
                console.log("Invalid password.");
                console.log(result);
                res.setHeader(
                  "response-description",
                  "Invalid username or password."
                );
                res.statusCode = 404;
                res.end();
              }
            });
          } else {
            console.log("User not found.");
            res.setHeader(
              "response-description",
              "Invalid username or password."
            );
            res.statusCode = 404;
            res.end();
          }
        })
        .catch(function(err) {
          console.log(err);
          res.setHeader(
            "response-description",
            "Oops, something went wrong #121."
          );
          res.statusCode = 500;
          res.end();
        });
    }
  });
};
