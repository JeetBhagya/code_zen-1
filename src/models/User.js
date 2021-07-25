const { Schema, model } = require("mongoose")
const { isEmail } = require("validator")
const bcrypt = require("bcrypt")
const userSchema = new Schema({
    "name": { type: String, required:[true,"Name is required"],minlength:[5,"Minimum length should be 5"]},
    "email": { type: String, unique:true,required: [true,"Email is required"], minlength: [10,"Minimum length should be 10"], validate: (value) =>  isEmail(value)},
    "password": { type: String, required:[true,"Password is required"],minlength:[6,"Minimum length should be 6"]},
    "created_at": {type: Date, default: new Date()}
})
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
    
    
})
userSchema.statics.login = async function(email, password) {
     
    const user = await this.findOne({ email })
   
    if (user) {
        const isValid = await bcrypt.compare(password, user.password)
        console.log(isValid);
        if (isValid)
            return user
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
}
const User = model("user", userSchema)

module.exports=User