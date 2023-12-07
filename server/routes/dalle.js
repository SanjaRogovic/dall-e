import express from "express";
import OpenAI from "openai";


const dalleRouter = express.Router()

const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY
});


dalleRouter.get("/", async (req, res) => {
    try {
        res.send("Hello from DALL-E")
        
    } catch (error) {
        res.send({message: `Dall-e router not setup`})
    }
})

dalleRouter.post("/", async (req, res) => {
    try {
        const {prompt} = req.body 
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json"
        })

        const image = response.data[0].b64_json

        res.status(200).json({photo: image})
    } catch (error) {

        if (error.response && error.response.status === 400) {
            // Billing hard limit reached
            return res.status(402).json({ error: "Billing hard limit reached" });
          }

        res.status(500).json({ error: error.message || "Something went wrong" });
    }
})

export default dalleRouter