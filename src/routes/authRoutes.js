const express = require("express")
const router = express.Router()
const { signupController,loginController,logOutController } = require("../controllers/authController")
router.post("/signup", signupController)
router.post("/login",loginController)
router.get("/logout", logOutController)

module.exports = router