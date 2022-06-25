// import mongoose
const mongoose = require('mongoose');
// import du validateur unique
const uniqueValidator = require('mongoose-unique-validator');

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
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// Mise en place du pluggin unique validator pour empecher plusieurs users d'avoir la meme adresse mail
userSchema.plugin(uniqueValidator);

// export de ce schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);
