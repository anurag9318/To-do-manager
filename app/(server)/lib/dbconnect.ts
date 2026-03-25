import mongoose from "mongoose";
const mongoDB_url= process.env.mongo_DB_url
const dbconnect=async()=>{
    
    const conn= await mongoose.connect(`${mongoDB_url}`)
    if(conn){
        console.log("Database is connected successfully...");
        
    }

}
export default dbconnect