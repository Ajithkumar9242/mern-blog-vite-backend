const dotenv = require('dotenv').config()
const express = require('express')
const multer = require('multer')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL)
.then(console.log(`Connected to Mongo`))
.catch(console.log(`Err`))


const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "images")
    },
    filename: (req, file, cb) =>{
        cb(null, req.body.name)
    }
})

const upload = multer({
    storage: storage
})

app.post("/api/upload", upload.single("file"), (req, res) =>{
    res.status(200).json("File Has Been Uploaded")
})

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/categories", categoryRoute)

app.listen(PORT , () =>{
    console.log(`Server Started At ${PORT}`);
})