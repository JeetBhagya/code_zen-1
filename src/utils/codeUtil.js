const Code = require("../models/Code")
const saveCode = async (title, code, format, lang, user_id) => {
  switch (lang) {
    case "python": {
  
      
      const _code = await Code.findOne({ user_id, title }, { lang, title, code, format, user_id })
            
      if (!_code) {
        id = await Code.create({ lang, title, code, format, user_id })
        return id
      }
      else {
        id = _code._id
        await Code.updateOne({_id:id } , { lang, title, code, format,  user_id })

        return _code
      }
    }
    case "cpp": {
    
      
     
      let id = ""
      const _code = await Code.findOne({ user_id, title }, { lang, title, code, format, user_id })
      if (!_code) {
        id = await Code.create({ lang, title, code, format, user_id })
        return _id
      }
      else {
        await Code.findOneAndUpdate({ user_id, title }, { lang, title, code, format, user_id })

        return _code
      }
    }
    case "javascript": {
 
      let id = ""
      const _code = await Code.findOne({ user_id, title }, { lang, title, code, format, user_id })
      if (!_code) {
        id = await Code.create({ lang, title, code, format, user_id })
        return _id
      }
      else {
        await Code.findOneAndUpdate({ user_id, title }, { lang, title, code, format, user_id })

        return _code
      }
        
    }
  }
}




const handleDeleteCode = async (id,path) => {
  try {
    await Code.deleteOne({ _id: id })
    return { "status": "success", "errors": "" };

  }
  catch (e) {
    return { "status": "failure", "errors": e };
  }
}

async function exists (path) {  
  try {
    await Fs.access(path)
    return true
  } catch {
    return false
  }
}
module.exports = { saveCode,handleDeleteCode,exists}