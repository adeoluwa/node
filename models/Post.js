const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required: [true, 'make you put title na 😡😡'],
            trim: true,
        },

        image:{
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        }
    },
    {timestamp: true}
)
const Post = mongoose.model('post', PostSchema);

module.exports = Post

