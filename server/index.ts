import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user";
import adminRoute from "./routes/admin";
import productRoute from "./routes/product";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user",userRoute);
app.use("/admin",adminRoute);
app.use("/products",productRoute);

const databaseURI = process.env.DATABASE_URI!;

const connectToDatabase = async ()=>{
    try{
        await (mongoose as any).connect(databaseURI,{dbName:"e-commerce-website"});
        console.log("Connected to database.");
    }catch(error){
        console.error("Connection error with database:",error);
    }
}

connectToDatabase();
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is started at ${PORT}.`);
});