module.exports.signUpErrors = (err) => {
    let errors = { username: '', email: '', password: '' };
    if (err.message.includes('username'))
        errors.username = 'username incorrecte ou déjà utilisée';
    if (err.message.includes('email'))
        errors.email = 'email incorrecte ou déjà utilisée';
    if (err.message.includes('password'))
        errors.password =
            'password incorrecte, il doit faire plus de 6 caractères';

    return errors;
};

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' };
    if (err.message.includes('email')) errors.email = 'email incorrecte';
    if (err.message.includes('password'))
        errors.password = 'password incorrecte';

    return errors;
};
