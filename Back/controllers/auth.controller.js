const UserModel = require('../models/user.models');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors');

const maxAge = 3 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge, // 3 days
    });
};

module.exports.signUp = async (req, res) => {
    console.log(req.body);
    const { username, email, password } = req.body;
    try {
        // on cree un nouvel utilisateur dans la base de donnees
        const user = await UserModel.create({ username, email, password });
        res.status(201).json({
            message: 'User created',
            user: user._id,
        });
    } catch (err) {
        // on recupere les erreurs de l'utilisateur
        const errors = signUpErrors(err);
        res.status(200).send({ errors });
    }
};

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        // on recupere l'utilisateur dans la base de donnees et on stocke dans user
        const user = await UserModel.login(email, password);
        // on genere un token avec l'id de l'utilisateur
        const token = createToken(user._id);
        // on envoie le token dans le cookie
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge });
        // on envoie le token dans le cookie et on confirme que l'utilisateur est connecte
        res.status(200).json({
            message: 'User logged in',
            user: user._id,
        });
    } catch (err) {
        // on recupere les erreurs de l'utilisateur
        const errors = signInErrors(err);
        res.status(200).send({ errors });
    }
};

module.exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};
