const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./src/routes/routes")
const cors = require("cors")
const port = process.env.PORT || 8000

app.use(cors())
app.use("/",route)
app.use(express.static("public"))
mongoose.connect("mongodb+srv://root:root@cluster0.mc6f43m.mongodb.net/?retryWrites=true&w=majority"
,()=> {console.log("Connected to DB")})
app.get("*",(req,res)=> {
    res.send("page not found")
})
app.listen(port,()=> { console.log(`Server is up at ${port}`)})