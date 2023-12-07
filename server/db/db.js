import mongoose from "mongoose";

const connectDB = (url) => {
    mongoose.set("strictQuery", true) //for search functionality

    mongoose.connect(url)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log(error.message))
}

export default connectDB