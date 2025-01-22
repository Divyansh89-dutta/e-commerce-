require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
const connectDB = require("./config/mongodb");
const indexRoutes = require("./routes/index.routes");
const userRoutes = require("./routes/user.routes");

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkxMzE1ZDFhNzEwODgxZWFkZmJkZTIiLCJpYXQiOjE3Mzc1Njg2MDUsImV4cCI6MTczNzU3MjIwNX0.VG3RCjML0bQF4tNCvAhDyMgZElexP0fdBDgQhuBkgpI
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkxMzE1ZDFhNzEwODgxZWFkZmJkZTIiLCJpYXQiOjE3Mzc1NjkxOTcsImV4cCI6MTczNzU3Mjc5N30.t41Bz1YzbDpeoLlCeiI95OVtagCsHnnt4huP7nNTCZs
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", indexRoutes);
app.use('/user', userRoutes); 





app.listen(4000, () => {
    console.log("server is running on port 4000");
})