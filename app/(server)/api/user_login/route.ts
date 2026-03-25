import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbconnect";
import { UserModel } from "../../model/model";

export const POST= async(request:Request)=>{
    await dbconnect()
    
    try {
        const {email, password}= await request.json()
        const isExist= await UserModel.findOne({email})
        if(!isExist){
            return NextResponse.json({
                success:false,
                message:"No user Exist..",
                code:404,
                error:true
            })
        }
        
        if(password== isExist.password){
            return NextResponse.json({
                success:true,
                message:"User Login Successfully",
                name:isExist.name,
                code:200,
                token:["aaaaa"],
                id:isExist._id,
                error:false,
            })
        }else{
            return NextResponse.json({
                success:false,
                message:"Invalid Credentials",
                code:400,
                error:true,
            })
        }
    } catch (error) {
         return NextResponse.json({
                success:false,
                message:"Internal server error 1",
                code:500,
                error:error,
            })
    }
}