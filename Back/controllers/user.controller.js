const UserModel = require('../models/user.models');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.getOneUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).json({
            message: 'Invalid id :' + req.params.id,
        });
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('id not found :' + err);
    }).select('-password');
};
