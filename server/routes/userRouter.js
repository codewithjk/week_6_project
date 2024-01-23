const express = require("express");
const router = express();

const controller = require("../controller/userController");

router.get("/", controller.indexRender);
router.get("/signup", controller.signupRender);
router.get("/home", controller.homeRender);
router.get("/login", controller.loginRender);
router.get("/logout", controller.logout);

//API
router.post("/register", controller.create);
router.post("/login", controller.login);

module.exports = router;
