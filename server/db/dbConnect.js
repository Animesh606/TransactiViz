import mongoose from "mongoose";
import { mongo_url } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(mongo_url);
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log("Error in database Connection: ", error);
        process.exit(1);
    }
}

export default connectDB;