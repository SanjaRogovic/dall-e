import express from "express";
import "dotenv/config";
import {v2 as cloudinary } from "cloudinary"
import Post from "../models/Post.js"

const postRouter = express.Router()


//configure to be able to upload the images
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//GET all posts
postRouter.get("/", async (req, res) => {
    try {
        const posts = await Post.find({})

        res.status(200).json({success: true, data: posts})
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
})

//CREATE a post
postRouter.post("/", async (req, res) => {
    try {
        //get all the data from the frontend
        const {name, prompt, photo} = req.body

        //upload photo url to cloudinary to get cloudinary optimized url
        const photoUrl = await cloudinary.uploader.upload(photo)

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        })

        res.status(201).json({success: true, data: newPost})

    } catch (error) {
        res.status(500).json({success: false, message: error})
    } 
})

export default postRouter