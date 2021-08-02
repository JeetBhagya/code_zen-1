const express = require("express")
const cors = require("cors")
const app = express()
require("dotenv").config()
const session  =  require("express-session")
const codeRoutes = require("./routes/codeRoutes")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo")
// var mongoUri = "mongodb+srv://xanjit:xanjit123@todoly.ygsi4.mongodb.net/todoly?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true,createIndexes:true,useFindAndModify:true }, (err,data) => {
    
    app.listen(process.env.PORT || PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    })
})
const sessionStore = new MongoStore({ mongoUrl:process.env.MONGODB_URI,mongoOptions:{ useUnifiedTopology: true, useNewUrlParser: true}})
app.use(cors({origin:process.env.CLIENT_HOST,credentials:true}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
         maxAge:1000*60*60*24
    },
    saveUninitialized: true,
    store: sessionStore,
    resave:false
}))
const PORT = 5000
app.get("/", (_, res) => {
    res.send("Welcome to CodeZen "+_.session?.user?.name)
})
 
app.use("/",authRoutes)
app.use("/",codeRoutes)
