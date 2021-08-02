const { spawn, exec } = require('child_process');
var errors = []
   exec("untitled", { timeout: 100 * 2 }, (error, stdout, stderr) => {
                    console.log("stderr",stderr);
                    console.log("error",error);
                      
                        if (error)
                            errors.push(error)
                        if (stderr)
                            errors.push(stderr)

                        console.table({ "output": stdout, "errors": errors })
                        
                
                    });