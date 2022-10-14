const express = require("express");
const Post = require("../models/post")
const bodyparser = require("body-parser")
const route = express.Router()
const data = require("./intialdata")
const multer = require("multer")


route.use(bodyparser())

const storage = multer.diskStorage({
    destination: __dirname+"/images/",
    filename: (req, file, cb) => {
        const [name,extention]  = file.originalname.split(".");
        filename = name + "." + extention
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
        const [name,extention] = req.file.originalname.split(".");
        filename = name + "." + extention
        req.body.date = new Date(Date.now())
        const posts = await Post.create({
            name : req.body.name,
            location : req.body.location,
            likes : 0,
            description : req.body.description,
            date  : req.body.date,
            PostImage : filename
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

// route.put("/posts", async (req, res) => {
//     try {
//         const posts = await Post.updateOne({ _id: req.params.id })
//         res.json({
//             status: "Success",
//             posts
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: "failed",
//             message: error.me
//         })
//     }
// })

// route.delete("/posts", async (req, res) => {
//     try {
//         const posts = await Post.deleteOne({ _id: req.params.id })
//         res.json({
//             status: "Success",
//             posts
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: "failed",
//             message: error.me
//         })
//     }
// })


module.exports = route;

