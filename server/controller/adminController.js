const dbOperation = require("../database/dboperations");

exports.getadmin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin/dashboard");
  } else {
    res.redirect("/admin/login");
  }
};
exports.loginRender = (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin/dashboard");
  } else {
    res.render("adminLogin");
  }
};

exports.dashboardRender = (req, res) => {
  if (req.session.admin) {
    if (req.query.search) {
      const searchString = req.query.search;
      const regexPattern = new RegExp(searchString, "i");
      dbOperation.searchUsers(regexPattern).then((data) => {
        res.render("dashboard", { users: data });
      });
    } else {
      dbOperation.findAllUsers().then((data) => {
        res.render("dashboard", { users: data });
      });
    }
  } else {
    res.redirect("/admin");
  }
};

exports.adminLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  dbOperation
    .findAdminByEmail(email)
    .then((data) => {
      if (password === data[0].password) {
        // res.send(data[0].password);
        req.session.isLoggedIn = true;
        req.session.admin = data[0];
        res.redirect("/admin/dashboard");
      } else {
        res.render("index", { invalidEmail: "Invalid password" });
      }
    })
    .catch((error) => {
      throw error;
    });
};

exports.renderAddUserForm = (req, res) => {
  if (req.session.admin) {
    res.render("addUserForm");
  } else {
    res.redirect("/admin");
  }
};

exports.renderEditUserForm = (req, res) => {
  if (req.session.admin) {
    const id = req.query.id;
    dbOperation.findUserById(id).then((data) => {
      res.render("editUserForm", { user: data[0] });
    });
  } else {
    res.redirect("/admin");
  }
};

exports.addUser = (req, res) => {
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
      res.redirect("/admin/adduser");
    })
    .catch((err) => {
      if (err.code == 11000) {
        res.render("addUserForm", { error: "email is already used try again" });
      } else {
        res.status(500).send({
          messagesss: err.message || "some error in ctreating user",
        });
      }
    });
};

exports.editUser = (req, res) => {
  const id = req.query.id;
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  dbOperation.updateUser(id, user).then((data) => {
    // res.send(data);
    res.redirect("/admin/dashboard");
  });
};

exports.deleteUser = (req, res) => {
  const id = req.query.id;
  dbOperation.deleteUser(id).then((data) => {
    // res.send(data);
    res.redirect("/admin/dashboard");
  });
};
