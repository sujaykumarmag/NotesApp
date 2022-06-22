const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/error') // Middleware ErrorHandler
// Routes
const notes = require('./routes/notes');
const users = require('./routes/users');

// Configuring .env files
dotenv.config({ path: "./config/config.env" })

// Connection with DB
connectDB();

// Initializing express
const app = express();

// To use the body data
app.use(express.json({strict:true}));

// Logger --> only for development Purposes
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Mounting the routers
app.use('/api/v1/notes', notes);
app.use('/api/v1/users',users)

// Using the error Handler
app.use(errorHandler);


// Open PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is Up and Running in port ${PORT}`)
})

