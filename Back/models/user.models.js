// import mongoose
const mongoose = require('mongoose');
// import du validateur unique
const uniqueValidator = require('mongoose-unique-validator');
// import du plugin de validation de l'email
const { isEmail } = require('validator');
// import du plugin de hashage du mot de passe
const bcrypt = require('bcrypt');

// Models du schema d'un user qu'on doit retrouver dans la base de donnees
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    image: {
        type: String,
        default:
            'https://res.cloudinary.com/dzqbzqgjm/image/upload/v1599098981/default-user_qjqjqg.png',
    },
    commentsIds: [],
});

// function qui va se jouer avant d'envoyer a la bdd
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// function pour desaler le mot de passe
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Invalid password');
    }
    throw Error('Invalid email');
};

// Mise en place du pluggin unique validator pour empecher plusieurs users d'avoir la meme adresse mail
userSchema.plugin(uniqueValidator);

// export de ce schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);
