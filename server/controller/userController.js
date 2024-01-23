const model = require("../model/model");
const dbOperation = require("../database/dboperations");
const bcrypt = require("bcrypt");

//User registration
exports.create = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 13),
  };

  dbOperation
    .createUser(user)
    .then((data) => {
      req.session.isLoggedIn = true;
      req.session.user = data;
      res.redirect("/home");
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.render("signup", {
          error: `${err.keyValue.email} is already used, try login`,
        });
        res.end();
      } else {
        res.status(500).send({
          message: err.message || "some error in ctreating user",
        });
      }
    });
};

//User login
exports.login = async (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    const email = req.body.email;
    const password = req.body.password;
    dbOperation
      .findUserByEmail(email)
      .then((data) => {
        if (data.length < 1) {
          res.render("index", { invalidEmail: "email not found" });
        } else {
          bcrypt.compare(password, data[0].password).then((isUser) => {
            if (isUser) {
              req.session.isLoggedIn = true;
              req.session.user = data[0];
              res.redirect("/home");
              res.end();
            } else {
              res.render("index", { invalidEmail: "Invalid password" });
              res.end();
            }
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message: err.message || "server error",
        });
      });
  }
};

exports.indexRender = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("index");
  }
};
exports.homeRender = (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.redirect("/");
  }
};
exports.signupRender = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("signup");
  }
};
exports.loginRender = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.redirect("/");
  }
};

//user logout
exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res.send(error);
      res.end();
    } else {
      res.redirect("/");
      res.end();
    }
  });
};
