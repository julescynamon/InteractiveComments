// import mongoose
const mongoose = require('mongoose');
// import de l' userSchema
const userSchema = require('./user.models');

//comments schema
const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: String,
    score: Number,
    commenterInfo: userSchema,
    replies: [
        {
            content: String,
            createdAt: String,
            score: Number,
            replyingTo: String,
            commenterInfo: userSchema,
            replyToOtherReply: String,
            mainCommentId: String,
        },
    ],
});

module.exports = mongoose.model('comment', commentSchema);
