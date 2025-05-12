import mongoose from "mongoose";
import { db_name } from "../constants.js";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`)
        console.log(`database connected`);
        
    } catch (error) {
        console.log("Error connecting to the database:", error.message);        process.exit(1)
    }
}

export default connectDB;