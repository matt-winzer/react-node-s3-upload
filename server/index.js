require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const PORT = process.env.port || 3000;

// middleware
app.use(morgan('dev'));

// routes
app.use(express.static(path.join(__dirname, '../public')));
app.use('/upload', require('./routes/uploadRoutes'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
