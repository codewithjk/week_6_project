exports.getadmin = (req, res) => {
  if (req.session.admin) {
    res.redirect("/admin/dashboard");
  } else {
    res.redirect("/admin/login");
  }
};
exports.loginRender = (req, res) => {
  res.render("adminLogin");
};

exports.dashboardRender = (req, res) => {
  res.render("dashboard");
};
