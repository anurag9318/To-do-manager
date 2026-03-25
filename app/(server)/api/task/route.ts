import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbconnect";
import TaskModel from "../../model/model";
import { cookies } from "next/headers";

// API for creating the task in database

export const POST = async (request: Request) => {
    try {
        await dbconnect()
        const { name, des, due, priority, status, id } = await request.json()
        // create new user in mongoDB
        console.log(id)
        const newTask = await TaskModel.create({ name, des, due, priority, status, id});
        return NextResponse.json({
            success: true,
            status: 201,
            message: "Task created successfully",
            user: newTask,
            error: false
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            code: 500,
            message: "Internal server error",
            error: error.message,

        })
    }
}
// API for getting the task list
export const GET = async (request: Request) => {
    // const { searchParams } = new URL(request.url);
    // const uid = searchParams.get("uid")
    // console.log(uid ,"%%%%%%%%%%%%")
    const cookieStore= cookies()
    const uid=  (await cookieStore).get("ID")?.value
    console.log(uid)
    try {
        await dbconnect()
        const getTask = await TaskModel.find({id:uid}).sort({ due: -1 });
        if (getTask.length > 0) {
            return NextResponse.json({
                success: true,
                code: 200,
                message: "Task fetched successfully",
                Task: getTask,
                error: false
            })
        } else {
            return NextResponse.json({
                success: false,
                code: 200,
                message: "No Task available ",
                Task: getTask,
                error: false
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            code: 500,
            message: "Internal server error ....",
            error: error.message
        })
    }
}
// API for delete the task

export const DELETE = async (request: Request) => {

    try {
        await dbconnect()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get("id")
        const deleteTask= await TaskModel.deleteOne({_id:id})
        return NextResponse.json({
            success:true,
            code:200,
            message:"Task Deleted successfully ",
            error:false,
            task:deleteTask,
            title:"Deleted",
            icon:"success"
        })
    } catch (error) {
         return NextResponse.json({
            success:false,
            code:500,
            message:"something went wrong ",
            error:error,
            title:"failed",
            icon:"error"
        })
    }
}
