import mongoose from "mongoose";

export const connectDB = async () => {
    // @ts-ignore
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: "Inventory-System",
    }).then(() => {
        console.log("MongoDB Connected Successfully!");
    }).catch(err => {
        console.log("MongoDB Connected Failure!", err);
    })
}