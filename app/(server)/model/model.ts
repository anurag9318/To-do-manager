import mongoose, { model, models, Schema } from "mongoose";

const TaskSchema= new Schema({
    name:{
        type:String,
        required:true,
    },
    des:{
        type:String,
    },
    due:{
        type:String,
        required:true,
    
    },
    priority:{
      type:String,
      required:true
    },
    status:{
        type:String
    },
    id:{
        type:String
    }
},{timestamps:true})

const TaskModel= models.Task || model("Task",TaskSchema)

export default TaskModel

const UserSchema= new Schema({
    name:{type:String},
    email:{type:String, unique:true},
    age:{type:String},
    password:{type:String},
    profile:{type:String}
},{timestamps:true})
export const UserModel= models.User || model("User", UserSchema)