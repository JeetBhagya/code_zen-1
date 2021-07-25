const { spawn, exec } = require('child_process');
const process = require("process")
const path = require("path")
const fs = require("fs/promises")

const compileCodeController = async (req, res) => {
    const { filename, input } = req.body

    try {
        var a = ""
        if(filename.includes("\\"))
             a = filename.split("\\")
        else
            a = filename.split("/")
        var lang = ""
        if (process.env.PORT) {
            lang = a[a.length - 4]
        }
        else {
            lang = a[a.length - 3]

        }
        
        const title = a[a.length - 1].split(".")[0]
        console.log(title,lang);
        var output = "";
        if (lang === "python") {
            var args = [filename]
            var inputFile = filename.replace(a[a.length - 1],"input.txt")
            var outputFile = filename.replace(a[a.length - 1], "output.txt")
            var inputs = input.toString()
            var isKilled = false
            inputs = inputs.replace(/,/g, "\n")
            await fs.writeFile(inputFile,inputs)
  
            var errors = []
            const python = spawn('python', args, {detached:true});
                      const timeout = setTimeout(() => {
  try {
      process.kill(python.pid, 'SIGKILL');
      isKilled = true
  } catch (e) {

                        errors.push(e)
  }
}, 1000*2);
            python.on('error', err => errors.push(err)
);
            python.stdout.on('data', function (data) {
                // output = data.toString();
                console.log(data.toString());
            });
             python.stderr.on('data', function (data) {
                        errors.push(data)

 });
   
            python.on('exit', () => {
                        
                            if (isKilled) {
                                errors.push("TLE")
                                //    res.json({ "output": "", "errors": errors })
                       
                                clearTimeout(timeout);
                            }
                        });
            python.on('close', async(code) => {
                output = await fs.readFile(outputFile)
                res.json({ "output": output.toString(), "errors": errors.toString() })

            });
            
        }
        else if (lang === "cpp" || lang === "c") {
            var args = ['-o', title, filename]
                    var errors = []

        const relativePath = path.join(__dirname,"..", "codes", "cpp", `${title}`)
 const cpp = spawn('g++',args,{ detached:true});
 cpp.stdout.on('data', function (data) {
  output = data.toString();
 });
 cpp.stderr.on('data', function (data) {
                        errors.push(data)

 });
            cpp.on('close', (code) => {
                
                exec(relativePath, {timeout:100*2}, (error, stdout, stderr) => {
                    
                    if (error)
                        errors.push(errors)
                    if (stderr)
                        errors.push(stderr)

                        res.json({ "output": stdout, "errors": errors.toString() })
                        
                
                });

 });
        }
        else {
            
        }
        
    }
    catch (e) {
        res.status(501).send({errors:e})
    }
}




const runCode = async(filename,input)=>
{
    const a = filename.split("\\")
    const lang = a[a.length - 2]

    const title = a[a.length - 1].split(".")[0]
    var output="";
    switch (lang) {
        case "python": {
            var args = [filename, ...input]
 const python = spawn('python',args);
 python.stdout.on('data', function (data) {
  output = data.toString();
 });
            python.on('close', (code) => {

 });
            break;
        }
        case "cpp": {
            
            var output;
            var args = ["-o",title,filename,...input]
 const cpp = spawn('python',args);
 cpp.stdout.on('data', function (data) {
  output = data.toString();
 });
                cpp.on('close', (code) => {
        exec(relativePath+title, (error, stdout, stderr) =>  stdout);

 });
            break;
        
        }
        case "javascript": {
            console.log("Javascript");
            break;

        }
    }
    return output
}

module.exports = compileCodeController