const router = require("express").Router()
const User = require('../models/Users')
const Post = require("../models/Post")
const bcrypt = require('bcrypt')

//UPDATE

router.put("/:id" , async (req, res) =>{
    if (req.body.userId === req.params.id) {
        if(req.body.password){
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true})
            res.status(200).json(updateUser)
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).json("YOU CAN UPDATE ONLY YOUR ACCOUNT")
    }
})


//DELETE
router.delete("/:id" , async (req, res) =>{
    if (req.body.userId === req.params.id) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        } catch (error) {
            console.log(error);
        }
    } else {
        res.status(401).json("YOU CAN UPDATE ONLY YOUR ACCOUNT")
    }
})


//GET USER

router.get("/:id" , async (req, res) =>{
    try {
        
    const user = await User.findById(req.params.id)
    const { password , ...others} = user._doc
    res.status(200).json(others)
    } catch (error) {
        console.log(error);
    }

})


module.exports = router