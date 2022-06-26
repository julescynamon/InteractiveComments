const CommentsModels = require('../models/comments.models');
const UserModel = require('../models/user.models');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllComments = (req, res) => {
    CommentsModel.find({}, (err, comments) => {
        if (err) {
            console.log('Error getting all comments :' + err);
        } else {
            res.status(200).send(comments);
        }
    });
};

module.exports.getCommentById = (req, res) => {
    const { id } = req.params;
    CommentsModel.findById(id, (err, comment) => {
        if (err) {
            console.log('Error getting comment by id :' + err);
        } else {
            res.status(200).send(comment);
        }
    });
};

module.exports.createComment = async (req, res) => {
    const newComments = new CommentsModels({
        commenterId: req.body.commenterId,
        content: req.body.content,
        score: [],
        replies: [],
    });

    try {
        const comment = await newComments.save();
        return res.status(200).json(comment);
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports.updateComment = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    const updateContent = {
        content: req.body.content,
    };
    CommentsModels.findByIdAndUpdate(
        req.params.id,
        { $set: updateContent },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log('Error in update comment :' + err);
        }
    );
};

module.exports.deleteComment = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    CommentsModels.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error in delete comment :' + err);
    });
};

// Vote

module.exports.vote = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    try {
        await CommentsModels.findByIdAndUpdate(
            req.params.id,
            { $push: { score: req.body.userId } },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Error in vote comment :' + err);
            }
        );
    } catch (error) {
        return res.status(400).send(error);
    }
};

// Reply

module.exports.reply = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    try {
        await CommentsModels.findByIdAndUpdate(
            req.params.id,
            { $push: { replies: req.body } },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Error in reply comment :' + err);
            }
        );
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports.updateReply = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    try {
        await CommentsModels.findByIdAndUpdate(
            req.params.id,
            { $set: { content: req.body.content } },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Error in update reply :' + err);
            }
        );
    } catch (error) {
        return res.status(400).send(error);
    }
};

module.exports.deleteReply = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    try {
        await CommentsModels.findByIdAndUpdate(
            req.params.id,
            { $pull: { replies: { _id: req.body.replyId } } },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Error in delete reply :' + err);
            }
        );
    } catch (error) {
        return res.status(400).send(error);
    }
};

// Vote Reply

module.exports.voteReply = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send('No valid id');
    }
    try {
        await CommentsModels.findByIdAndUpdate(
            req.params.id,
            { $push: { replies: { score: { _id: req.body.replyId } } } },
            { new: true },
            (err, docs) => {
                if (!err) res.send(docs);
                else console.log('Error in vote reply :' + err);
            }
        );
    } catch (error) {
        return res.status(400).send(error);
    }
};
