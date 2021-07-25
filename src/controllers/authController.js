const User = require("../models/User")

const loginController = async(req, res) => {
    const { email, password } = req.body
    try {

        const result = await User.login(email, password)
        
        if (result) {
        req.session.user = {name:result.name,email:result.email,id:result._id}
        res.json({"user":req.session.user})
        }

    }
    catch (e) {
        res.status(401).json({errors:e})
    }
  
}

const signupController = async (req, res) => {
    const { name, email, password } = req.body
   
    try {
        const result = await User.create({ name, email, password })
        req.session.user = {name:result.name,email:result.email,id:result._id}
        res.json({"user":req.session.user})
    }
    catch (e) {
        res.status(401).json({errors:e})
    }
}
const logOutController = async (req, res) => {
    req.session.destroy()
    res.json({"status":"success"})
}

module.exports = { signupController,loginController,logOutController }