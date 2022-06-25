const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: '.env' });
require('./config/db');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middlewares/authoryze');

const app = express();

//intercerpte les requetes de type json et donne accès au corps de la requète remplace body-parser
app.use(express.json());
// parse cookies
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json({
        id: res.locals.user._id,
    });
});

// Routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
