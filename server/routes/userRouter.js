const express = require("express");
const router = express();

const controller = require("../controller/userController");

router.get("/", controller.indexRender);
router.get("/signup", controller.signupRender);
// router.get("/allusers", controller.findall);
router.get("/home", controller.homeRender);

//API
router.post("/register", controller.create);
router.post("/login", controller.login);

module.exports = router;
