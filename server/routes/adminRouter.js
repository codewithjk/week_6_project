const express = require("express");
const router = express();

const controller = require("../controller/adminController");

router.get("/", controller.getadmin);
router.get("/login", controller.loginRender);
router.get("/dashboard", controller.dashboardRender);
router.get("/adduser", controller.renderAddUserForm);
router.get("/edituser", controller.renderEditUserForm);

router.post("/login", controller.adminLogin);
router.post("/adduser", controller.addUser);
router.post("/edituser", controller.editUser);
router.get("/deleteuser", controller.deleteUser);

module.exports = router;
