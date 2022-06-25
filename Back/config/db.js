const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

mongoose
    .connect(`${process.env.URL_MOMGO}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log('failed to connect to MongoDB', err))
