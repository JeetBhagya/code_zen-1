const express = require("express")
const cors = require("cors")
const app = express()
const http = require('http').Server(app);
const io = require("socket.io")(http,{
    cors: {
                origin: ["http://localhost:3000"]
            }
});
// const io = new Server(server,{
//     cors: {
//         origin: "http://localhost:3000"
//     }});
require("dotenv").config()
const session  =  require("express-session")
const codeRoutes = require("./routes/codeRoutes")
const authRoutes = require("./routes/authRoutes")
const mongoose = require("mongoose")
const MongoStore = require("connect-mongo");
const Code = require("./models/Code");
// var mongoUri = "mongodb+srv://xanjit:xanjit123@todoly.ygsi4.mongodb.net/todoly?retryWrites=true&w=majority"
mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true,createIndexes:true,useFindAndModify:false }, (err,data) => {
    
    http.listen(process.env.PORT || PORT, () => {
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
io.on("connection",(socket)=>{

socket.on("get_code",async(id,user_id)=>{
    // if(id)
    console.log("ID",id,user_id)
    const code = await findOrCreateDocument(id,user_id)
    socket.join(id)
    socket.emit("load_code",code)
    socket.on("send_code",(_code,title,lang,format)=>{
        console.log("Send",_code,title,lang,format)
        socket.broadcast.to(id).emit("receive_code",_code,title,lang,format)
    })
    socket.on("save_code",async(_code,title,lang,format)=>{
        console.log("Save",_code,title,lang,format)

       await Code.findByIdAndUpdate(id,{code:_code,title:title,lang:lang,format:format})
    })
   
})
socket.on("input",(input,id)=>{
    // if(id)
    socket.join(id)
    socket.to(id).emit("input",input)
    console.log("Input",input,"ID",id)

   
})
socket.on("output",(output,id)=>{
    // if(id)

    socket.join(id)
    socket.to(id).emit("output",output)
    console.log("output",output,"ID",id)

   
})
})
async function findOrCreateDocument(id,user_id) {
    if (id == null) return
  
    const code = await Code.findById(id)
    if (code) return code
    return await Code.create({ _id: id, code: "",user_id,lang:"python",title:"untitled",format:"py" })
  }
app.use("/",authRoutes)
app.use("/",codeRoutes)
