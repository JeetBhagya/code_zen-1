const saveCode = require("../utils/saveCode")
const saveCodeController = async (req, res) => {
    const { title, code, format, lang } = req.body
    console.log(title,code,format,lang);
    try {
        const result = await saveCode(title, code, format, lang,req.session.user.id,req.session.user.name)
        res.json({"status":result})
    }
    catch (e) {
        res.status(404).json({errors:e})
    }
}


module.exports = saveCodeController

