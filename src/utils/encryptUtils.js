const Encrypter = require("./Encrypter")
const decrypt = async (data) => {
  try {
   const encrypter = new Encrypter(process.env.ENCRYPTION_KEY);
return dencrypted = encrypter.dencrypt(data);

  }
  catch (e) {
    return { "status": "failure", "errors": e };
  }
}
  const encrypt = async (data) => {
  try {
   const encrypter = new Encrypter(process.env.ENCRYPTION_KEY);

    return encrypter.encrypt(data);
    

  }
  catch (e) {
    return { "status": "failure", "errors": e };
  }
}


module.exports = {decrypt,encrypt}