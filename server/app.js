require('dotenv').config();
const express = require("express");
const {configDB} = require('./config/database');
const app = express();
const PORT = process.env.PORT || 9000;

// Configuring MongoDB routine
configDB();

// Starting the backend server
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})