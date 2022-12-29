const express = require("express");
const Post = require("../models/post")
const bodyparser = require("body-parser")
const route = express.Router()
const data = require("./intialdata")
const multer = require("multer")
const cors = require("cors")

route.use(express.json())
route.use(express.urlencoded({extended:false}))
route.use(cors())

route.use(bodyparser())

const storage = multer.diskStorage({
    destination: __dirname+"/images/",
    filename: (req, file, cb) => {
        const [name,extension]  = file.originalname.split(".");
        filename = name + "." + extension
        cb(null,filename)
    }
})

const upload = multer({ storage: storage })

route.get("/", (req, res) => {
    res.send("Hi")
})


route.get("/posts", async (req, res) => {
    try {
        const posts = await Post.find()
        res.json({
            status: "Success",
             posts : posts
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

route.post("/posts",upload.single("PostImage"),async (req, res) => {
    try {
        const [name,extension] = req.file.originalname.split(".");
        filename = name+"."+extension
        req.body.date = new Date(Date.now())
        req.body.PostImage = filename;
        const posts = await Post.create({
            name:req.body.name,
            location:req.body.location,
            description:req.body.description,
            date:req.body.date,
            likes:0,
            PostImage:filename
        })
        res.json({
            status: "Success",
            posts: posts
        })
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message
        })
    }
})

route.get("/images/:name",(req,res)=> {
    const fileName = req.params.name;
    res.sendFile(__dirname+"/images/"+fileName);
    console.log(fileName)
    console.log(__dirname)
})

module.exports = route;
// src\routes\images\flight.jpg
//src\routes\images