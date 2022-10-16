const mongoose = require("mongoose")

const PostSchema =new mongoose.Schema({
    name: {type:String,required : true},
    location:  {type:String,required : true},
    description:  {type:String,required : true},
    PostImage:  {type:String,required : true},
    date: {type:String,required : true},
    likes: Number
})

const Post = mongoose.model("Post",PostSchema)

module.exports = Post;