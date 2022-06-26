const express = require('express');
const userRoutes = require('./routes/user.routes');
const commentsRoutes = require('./routes/comments.routes');
require('dotenv').config({ path: '.env' });
require('./config/db');
// Mise en place du package Helmet pour pour pouvoir respecter les standars de securite
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { checkUser, requireAuth } = require('./middlewares/authoryze');

const app = express();
//intercerpte les requetes de type json et donne accès au corps de la requète remplace body-parser
app.use(express.json());
// parse cookies
app.use(cookieParser());

// Utilisation de Helmet pour respecter les standars de securite, Helmet nous aide à protéger notre application de certaines des vulnérabilités bien connues du Web en configurant de manière appropriée des en-têtes HTTP.
app.use(helmet());

// Prévention des erreurs CORS
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ['sessionId', 'Content-Type'],
    exposedHeaders: ['sessionId'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
};
app.use(cors(corsOptions));

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).json({
        id: res.locals.user._id,
    });
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/comments', commentsRoutes);

// server
app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
