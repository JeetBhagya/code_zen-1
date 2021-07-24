const express = require("express")
const app = express()
const codeRoutes = require("./routes/codeRoutes")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const PORT = 5000
app.get("/", (_, res) => {
    res.send("Welcome to CodeZen")
 })
app.use("/",codeRoutes)
app.listen(process.env.PORT || PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})