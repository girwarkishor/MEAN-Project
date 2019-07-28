const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");

const app = express();
 
//Password: ayskeiRphOGJBs7M
mongoose.connect("mongodb+srv://girwar:ayskeiRphOGJBs7M@cluster0-0k6ma.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/posts",postsRoutes);

module.exports = app;