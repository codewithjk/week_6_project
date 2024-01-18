const express = require("express");
const router = express();
const service = require("../services/userRender");

const controller = require("../controller/controller");

router.get("/", service.indexRoutes);
router.post("/login", (res, req) => {});
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", (req, res) => {
  res.redirect("/home");
});
router.get("/home", (req, res) => {
  res.render("home");
});

//API
router.post("/api/adduser", controller.create);
router.get("/api/allusers", controller.find);

module.exports = router;
