const Code = require('../models/Code')
const getCodeController = async (req, res) => {
    const { id } = req.params
    console.log("code-id",id)
  
    try {

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            res.json({"status":"Invalid ID"})
    }
        const _code = await Code.findOne({ _id: id })
        if (!_code)
            res.json({"status":"Wrong ID"})
        res.json(_code)
    }
    catch (e) {
        console.log(e);
        res.status(404).json({errors:e})
    }
}
const getCodesController = async (req, res) => {

   
  
    try {

        
        const _codes = await Code.find({user_id:req.session.user.id})
        if (!_codes)
            res.json({"status":"Wrong ID"})
        res.json(_codes)
    }
    catch (e) {
        console.log(e);
        res.status(404).json({errors:e})
    }
}


module.exports = {getCodeController,getCodesController}

