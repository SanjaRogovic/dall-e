import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./db/db.js";
import postRouter from "./routes/post.js"
import dalleRouter from "./routes/dalle.js"

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRouter)
app.use("/api/v1/dalle", dalleRouter)


app.get("/", async (req, res) => {
  res.send("Hello from Dall-e");
});

const port = 5000 || process.env.PORT;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(port, () => {
      console.log(`Server has started on ${port}`);
    });
  } catch (error) {
    console.log(error.message);
  }
};

startServer();
