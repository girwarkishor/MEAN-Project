const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const Post = require("./models/post");

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
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});


app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully'
    });
});

app.get("/api/posts", (req, res, next)=>{
    // const posts=[
    //     {
    //         id: "ljasdflkj123",
    //         title: "First server-side post",
    //         content: "This is coming from the server"
    //     },
    //     {
    //         id: "oiuweqour123",
    //         title: "Second server-side post",
    //         content: "This is coming from the server!"
    //     }
    // ]; dummy content

    Post.find().then(documents => {
        res.status(200).json({
            message: "Posts fetched successfully!",
            posts: documents
        });
    }); // postSchema function
});

app.delete("/api/posts/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({message: "Post deleted!"});
    })
});

module.exports = app;