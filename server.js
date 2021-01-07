/* Express is a minimal and flexible Node.js web application framework that provides a robust 
set of features for web and mobile applications. */
const express = require('express');

/* Mongoose provides a straight-forward, schema-based solution to model your application data. 
It includes built-in type casting, validation, query building, business logic hooks and more, 
out of the box. */
const mongoose = require('mongoose'); 

/* Morgan is a HTTP request logger middleware for node.js */
const morgan = require('morgan'); // HTTP request logger

/* The path module provides utilities for working with file and directory paths. It can be accessed using */
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Reference api routes
const routes = require('./routes/api');

// Connect to MongoDB via Mongoose
mongoose.connect('mongodb://localhost/comments_db',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Check MongoDB Connection
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection is successfull!');
});

// These 2 lines of code allows the data from the client and made available to request.body
app.use(express.json());
app.use(express.urlencoded({ extended: false}))

// HTTP request logger
app.use(morgan('tiny'));
app.use('/api', routes);

app.listen(PORT, console.log(`Server is starting at port ${PORT}`));