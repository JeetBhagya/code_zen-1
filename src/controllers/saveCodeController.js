const { saveCode } = require("../utils/codeUtil")
const saveCodeController = async (req, res) => {
    const { title, code, format, lang,_id } = req.body
    console.log("_id",_id)
    try {

        const result = await saveCode(title, code, format, lang,req.session.user.id,_id)
        res.json({ "data": result })
    }
    catch (e) {
        console.log(e);
        res.status(404).json({errors:e})
    }
}


module.exports = saveCodeController

