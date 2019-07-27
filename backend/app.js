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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


app.post("/api/posts", (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save().then(createdPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
    });
});

app.get("/api/posts/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(post);
        } else {
            res.status(404).json({message: 'Post not found!'});
        }
    });
});

app.put("/api/posts/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({_id: req.params.id}, post).then(result => {
        res.status(200).json({message: "Update successful!"});
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