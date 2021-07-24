const { randomUUID } = require("crypto");
const fs = require("fs/promises")
const path = require("path")
const saveCode = async (title, code, format, lang) =>
{
   console.log(__dirname);
    switch (lang) {
      case "python": {
        const relativePath = path.join(__dirname,"..", "codes", "python", `${title}.${format}`)
        // console.log(relativePath);
        return await writeToFile(code,relativePath)
      }
      case "cpp": {
        const relativePath = path.join(__dirname,"..", "codes", "cpp", `${title}.${format}`)
        
        return await writeToFile(code,relativePath)
      }
      case "javascript": {
        const relativePath = path.join(__dirname,"..", "codes", "javascript", `${title}.${format}`)
      
        return await writeToFile(code, relativePath)
      }
        
    }
}

const writeToFile = async(code, filename)=>
{

    await fs.writeFile(filename, code)
    return filename

}

async function exists (path) {  
  try {
    await fs.access(path)
    return true
  } catch {
    return false
  }
}

module.exports = saveCode