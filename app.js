const express = require("express")
const mongoose = require("mongoose")
const app = express()
const route = require("./src/routes/routes")
const cors = require("cors")
const port = process.env.port || 8000

app.use(cors())
app.use("/",route)
app.use(express.static("public"))
app.set('view engine','ejs')
mongoose.connect("mongodb://localhost/instabase",()=> {console.log("Connected to DB")})





app.listen(port,()=> { console.log(`Server is up at ${port}`)})
