import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("connect");
    } catch (error) {
        console.log("connectio failed : ", error.message);
    }
}