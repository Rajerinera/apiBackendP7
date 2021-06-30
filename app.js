const express = require("express");
const cors = require('cors');
const path = require('path');
const app = express();
require('dotenv').config();

const userRoutes = require("./routes/user");
const loginRoutes = require('./routes/login');

 
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(express.json());

app.use(userRoutes);
app.use(loginRoutes);
module.exports = app;