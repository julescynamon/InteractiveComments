module.exports.signUpErrors = (err) => {
    let errors = { username: '', email: '', password: '' };
    if (err.message.includes('username'))
        errors.username = 'username incorrecte ou déjà utilisée';
    if (err.message.includes('email'))
        errors.email = 'email incorrecte ou déjà utilisée';
    if (err.message.includes('password'))
        errors.password =
            'password incorrecte, il doit faire plus de 6 caractères';
    if (err.code === 11000) errors.email = 'email déjà utilisée';

    return errors;
};
