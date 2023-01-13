const router = require("express").Router()
const bcrypt = require('bcrypt')
const User = require('../models/Users')

//REGISTER

router.post("/register" , async (req, res) =>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        })

        const user = await newUser.save()
        res.status(200).json(user)

    } catch (error) {
        console.log(error);
    }
})


//LOGIN

router.post("/login" , async (req,res) =>{
    try {
        const user = await User.findOne({username: req.body.username})

        !user && res.json("NO USERS FOUND");

        const validate = await bcrypt.compare(req.body.password, user.password)

        !validate && console.log(`PASSWORD DONT MATCH`);

        res.status(200).json(user)
    } catch (error) {
        console.log(error);
    }
})

module.exports = router