const { saveCode } = require("../utils/codeUtil")
const saveCodeController = async (req, res) => {
    const { title, code, format, lang } = req.body
    try {

        const result = await saveCode(title, code, format, lang,req.session.user.id)
        res.json({ "data": result })
    }
    catch (e) {
        console.log(e);
        res.status(404).json({errors:e})
    }
}


module.exports = saveCodeController

