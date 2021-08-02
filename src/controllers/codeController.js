const Code = require("../models/Code")
const { handleDeleteCode,decrypt } = require("../utils/codeUtil")
const fetchCodeController = async (req, res) => {
    const {id} = req.params
    try {
        const result = await Code.findById(id)

        res.json({"code":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}
const fetchCodesController = async (req, res) => {
    try {
        const result = await Code.find({user_id:req.session.user.id})
        res.json({"codes":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}
const fetchCodesByLanguageController = async (req, res) => {
    const {lang} = req.params
    try {
        const result = await Code.find({user_id:req.session.user.id,lang})
        res.json({"codes":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}
const fetchCodesByDateController = async (req, res) => {
    const { sortType } = req.params
    var upadated_at = "upadated_at"
    if (sortType === "desc") {
        upadated_at = "-upadated_at"
    }
  
    try {
        const result = await Code.find({ user_id: req.session.user.id }).sort(upadated_at)
        
        res.json({"codes":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}
const deleteCode = async (req, res) => {
    const { id } = req.params
    
    try {
        const code = await Code.findById(id)
        const path = decrypt(code.path)
        console.log(path);
        const result = await handleDeleteCode(id,path)
        res.json({"status":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}


module.exports = { fetchCodeController,fetchCodesController, fetchCodesByDateController, fetchCodesByLanguageController,deleteCode }
