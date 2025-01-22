const express = require('express');
const connectDB = require('./config/mongodb');
require("dotenv").config();
const app = express();
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use("/", indexRoutes);
app.use("/user", userRoutes);

app.listen(4000, () => {
    console.log('Server is running on port 3000');
})                          

