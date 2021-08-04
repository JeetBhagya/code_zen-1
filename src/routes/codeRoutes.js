const express = require("express")
const compileCodeController = require("../controllers/compileCodeController")
const saveCodeController = require("../controllers/saveCodeController")
const { fetchCodeController,fetchCodesByDateController,fetchCodesByLanguageController } = require("../controllers/codeController")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const {getCodeController,getCodesController} = require("../controllers/getCodeController")
router.use(isAuthenticated)
router.post("/compile", compileCodeController)
// router.get("/compile", (req,res) => { res.send("compile") })
router.post("/save",saveCodeController)

router.get("/code/:id",getCodeController)
router.get("/codes",getCodesController)

module.exports = router