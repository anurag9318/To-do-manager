import mongoose from "mongoose";

const dbconnect=async()=>{
    const conn= await mongoose.connect("mongodb+srv://atlasData:atlasData@cluster0.i8pgzdj.mongodb.net/ToDo")
    if(conn){
        console.log("Database is connected successfully...");
        
    }

}
export default dbconnect