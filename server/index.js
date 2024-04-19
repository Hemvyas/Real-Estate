import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import userRoutes from "./Routes/userRoutes.js"
import propertyRoutes from "./Routes/propertyRoute.js"
import Property from "./Models/Property.js"
dotenv.config();


const app=express();
app.use(express.json());
app.use(cors({
    origin:"*",
}));
app.use(cookieParser());

app.use("/api/user",userRoutes);
app.use("/api/property", propertyRoutes);



mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("DB Connected");
}).catch((error)=>{
    console.log(error);
})

const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server Started");
})

// import propertyData from "../client/src/utils/propertyData.json" assert{type:"json"}
// Property.insertMany(propertyData).then(()=>{
//   console.log("Data inserted successfully");
//       mongoose.connection.close();
// }).catch(()=>{
//   console.error("Error inserting data:", error);
//       mongoose.connection.close();
// })