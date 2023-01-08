const router = require("express").Router()
const User = require('../models/Users')
const Post = require("../models/Post")


//CREATE

router.post("/" , async (req, res) =>{
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()

        res.status(200).json(savedPost)
    } catch (error) {
        console.log(error);
    }
})


//UPDATE
router.put("/:id" , async (req, res) =>{
    try {
        const post = await Post.findById(req.params.id)

        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                    $set: req.body,
                },
                { new: true})
                res.status(200).json(updatedPost)
            } catch (error) {
                console.log(error);   
            }
        } else {
            res.status(401).json("you can update only your posts")
        }
    } catch (error) {
        console.log(error);
    }
})


//DELETE

router.delete("/:id" , async (req, res) =>{
   try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
        try {
            await post.delete()
            res.status(200).json("DELETED SUCCESSFULLY")
              
        } catch (error) {
        console.log(error);
            
        }
    } else {
        
    }
   } catch (error) {
    console.log(error);
    
   }
})

//GET POST

router.get("/:id" , async (req,res) =>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
    }
})

//GET ALL POST

router.get("/" , async (req,res) =>{
    const username = req.query.user
    const catName = req.query.cat
    try {
        let posts
        if (username) {
            posts = await Post.find({username})
        } else if(catName){
            posts = await Post.find({categories:{
                $in: [catName]
            }})
        } else{
            posts = await Post.find()
        }
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router