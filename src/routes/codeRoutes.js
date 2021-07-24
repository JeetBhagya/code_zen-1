const express = require("express")
const compileCodeController = require("../controllers/compileCodeController")
const saveCodeController = require("../controllers/saveCodeController")
const router = express.Router()

router.post("/compile", compileCodeController)
// router.get("/compile", (req,res) => { res.send("compile") })
router.post("/save",saveCodeController)

module.exports = router