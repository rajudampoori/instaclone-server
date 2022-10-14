const mongoose = require("mongoose")

const PostSchema = mongoose.Schema({
    name: {type:String,required : true},
    location:  {type:String,required : true},
    likes: Number,
    description:  {type:String,required : true},
    PostImage:  {type:String,required : true},
    date: {type:String,required : true}
})

Post = mongoose.model("Post",PostSchema)

module.exports = Post;