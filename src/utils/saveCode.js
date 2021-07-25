const { randomUUID } = require("crypto");
const fs = require("fs/promises")
const path = require("path")
const Code  = require("../models/Code")
const saveCode = async (title, code, format, lang,user_id,name) =>
{ 
    switch (lang) {
      case "python": {
        var rpath = ""
        if (process.env.PORT) {
          rpath = path.join(__dirname, "..", "codes", "python", user_id, title)
           console.log(rpath);
        }
        else {
          rpath = path.join(__dirname, "..", "codes", "python", title)

        }
        //  rpath = path.join(rpath, "hello")
        // rpath = path.join(rpath, `${title}`)
       
        if(await exists(rpath)===false)
        await fs.mkdir(rpath)
        var codes = `
import sys

sys.stdin = open(r'${path.join(rpath,"input.txt")}', 'r')
sys.stdout = open(r'${path.join(rpath,"output.txt")}', 'w')
         
${code}

        `
        const relativePath = path.join(rpath, `${title}.${format}`)
        
       await Code.findOneAndUpdate({user_id, title},{ lang, title, code, format,path:rpath,user_id})
     
        return await writeToFile(codes,relativePath,rpath)
      }
      case "cpp": {
         var rpath = ""
        if (process.env.PORT) {
          rpath = path.join(__dirname, "..", "codes", "cpp", user_id, title)
          console.log(rpath);
        }
        else {
          rpath = path.join(__dirname, "..", "codes", "cpp", title)

        }
        if(await exists(rpath)===false)
        await fs.mkdir(rpath)
        var codes = `
#include<bits/stdc++.h>
using namespace std;
main()
{
ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
#ifndef ONLINE_JUDGE
  freopen("${path.join(rpath,"input.txt")}", "r", stdin);
  freopen("${path.join(rpath,"output.txt")}", "w", stdout);
#endif

${code}
      }
        `
        const relativePath = path.join(rpath, `${title}.${format}`)
       await Code.findOneAndUpdate({user_id, title},{ lang, title, code, format,path:rpath,user_id})
        
        return await writeToFile(codes,relativePath,rpath)
      }
      case "javascript": {
             const rpath = path.join(__dirname,"..", "codes", "javascript")
        const relativePath = path.join(rpath, `${title}.${format}`)
       await Code.findOneAndUpdate({user_id, title},{ lang, title, code, format,path:rpath,user_id})
      
        return await writeToFile(code, relativePath,rpath)
      }
        
    }
}

const writeToFile = async(code, filename,rpath)=>
{
  console.log("Rpath", rpath);
  const inputFile = path.join(rpath,"input.txt")
  const outputFile = path.join(rpath,"output.txt")
  await fs.writeFile(filename, code)
  await fs.writeFile(inputFile,"")
  await fs.writeFile(outputFile,"")
  return [filename]

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