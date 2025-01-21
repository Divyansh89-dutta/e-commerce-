const express = require('express');
const connectDB = require('./config/mongodb');
require("dotenv").config();
const app = express();
connectDB();
app.get('/', (req, res) => {
    res.send('Hello World from Express');
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})                          
