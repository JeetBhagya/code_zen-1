const {spawn,exec} = require('child_process');
const path = require("path")

const compileCodeController = async (req, res) => {
    const { filename, input } = req.body
   
    try {
        const a = filename.split("\\")
        console.log(a);
        const lang = a[a.length - 2]
   
        const title = a[a.length - 1].split(".")[0]
        console.log(lang,"lang");
        var output = "";
        if (lang === "python") {
            var args = [filename, ...input]
            const python = spawn('python', args);
                    var errors = []
            python.stdout.on('data', function (data) {
                output = data.toString();
            });
             python.stderr.on('data', function (data) {
                        errors.push(data)

 });
   
            python.on('close', (code) => {
                res.json({ "output": output, "errors": errors })

            });
        }
        else if (lang === "cpp" || lang === "c") {
            var args = ['-o', title, filename, ...input]
                    var errors = []

        const relativePath = path.join(__dirname,"..", "codes", "cpp", `${title}`)
 const cpp = spawn('g++',args);
 cpp.stdout.on('data', function (data) {
  output = data.toString();
 });
 cpp.stderr.on('data', function (data) {
                        errors.push(data)

 });
            cpp.on('close', (code) => {
                exec(relativePath, (error, stdout, stderr) => {
                    
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