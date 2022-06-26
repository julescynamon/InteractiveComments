// import mongoose
const mongoose = require('mongoose');
const userSchema = require('./user.models');

//comments schema
const commentSchema = new mongoose.Schema({
    content: String,
    createdAt: String,
    score: {
        type: [Number],
        default: 0,
    },
    commenterId: {
        type: String,
        ref: 'User',
        required: true,
    },
    replies: [
        {
            content: String,
            createdAt: String,
            score: {
                type: [Number],
                default: 0,
            },
            replyingTo: String,
            commenterId: {
                type: String,
                ref: 'User',
                required: true,
            },
            replyToOtherReply: String,
            mainCommentId: String,
        },
    ],
});

module.exports = mongoose.model('comment', commentSchema);
