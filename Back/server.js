const express = require('express');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({ path: '.env' });
require('./config/db');
const app = express();

//intercerpte les requetes de type json et donne accès au corps de la requète remplace body-parser
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// server
app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
);
