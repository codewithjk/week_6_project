const model = require("../model/model");
const dbOperation = require("../database/dboperations");
const User = model.user;
//User registration
exports.create = (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
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
exports.login = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  dbOperation
    .findUserByEmail(email)
    .then((data) => {
      if (password === data[0].password) {
        // res.send(data[0].password);
        req.session.isLoggedIn = true;
        req.session.user = data[0];
        res.redirect("/home");
      } else {
        res.render("index", { invalidEmail: "Invalid password" });
      }
    })
    .catch((error) => {
      throw error;
    });
};
//---------------------------------------------------------------------------------------
//find all data
// exports.findall = (req, res) => {
//   User.find()
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((error) => {
//       res.status(500).send({
//         message: error.message,
//       });
//     });
// };

exports.indexRender = (req, res) => {
  res.render("index");
};
exports.homeRender = (req, res) => {
  if (req.session.user) {
    res.render("home", { user: req.session.user });
  } else {
    res.send("unotherized user");
  }
};
exports.signupRender = (req, res) => {
  if (req.session.user) {
    res.redirect("/home");
  } else {
    res.render("signup");
  }
};
