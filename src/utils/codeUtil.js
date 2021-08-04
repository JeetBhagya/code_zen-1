const Code = require("../models/Code")
const saveCode = async (title, code, format, lang, user_id,id) => {
  
  
      // if(id)
      // const _code = await Code.findOne({ user_id, title }, { lang, title, code, format, user_id })
            console.log("save_code_id",id)
      if (!id) {
        console.log("create")
        let _code = await Code.create({ lang, title, code, format, user_id })
        return _code
      }
      else {
        console.log("update")

       let _code =  await Code.updateOne({_id:id } , { lang, title, code, format })

        return _code
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