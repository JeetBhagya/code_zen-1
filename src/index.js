const express = require("express")
const cors = require("cors")
const app = express()
const session  =  require("express-session")
const codeRoutes = require("./routes/codeRoutes")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
// var mongoUri = "mongodb+srv://xanjit:xanjit123@todoly.ygsi4.mongodb.net/todoly?retryWrites=true&w=majority"
mongoose.connect("mongodb://127.0.0.1:27017/codezen", { useUnifiedTopology: true, useNewUrlParser: true,createIndexes:true,useFindAndModify:true }, (err,data) => {
    
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
})
const sessionStore = new MongoStore({ mongoUrl:"mongodb://127.0.0.1:27017/codezen",mongoOptions:{ useUnifiedTopology: true, useNewUrlParser: true}})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: "9d87b5bd9d0eec423556f34a2fb3c6e6b18678cf6dbf78a61099a6c5048d46e653c74e8c5de12cca927a5a5141625f3401837d723e16ee8dc1263772a026ae53",
    cookie: {
         maxAge:1000*60*60*24
    },
    saveUninitialized: true,
    store: sessionStore,
    resave:false
}))
const PORT = 5000
app.get("/", (_, res) => {
    res.send("Welcome to CodeZen "+_.session.user.name)
})
 
app.use("/",authRoutes)
app.use("/",codeRoutes)
