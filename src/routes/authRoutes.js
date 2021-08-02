const express = require("express")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const { signupController,loginController,logOutController,getUserController } = require("../controllers/authController")
router.post("/signup", signupController)
router.post("/login",loginController)
router.get("/logout", logOutController)
router.get("/user", isAuthenticated,getUserController)
module.exports = router