import { NextResponse } from "next/server";
import dbconnect from "../../lib/dbconnect";
import { UserModel } from "../../model/model";
import fs from 'fs'
import path from "path";
import { cookies } from "next/headers";

// API for the user signup---
export const POST = async (request: Request) => {


    try {
        await dbconnect()
        // const { name, age, email, password } = await request.json()
        const data = await request.formData()
        const name = data.get("name")
        const age = data.get("age")
        const email = data.get("email")
        const password = data.get("password")
        const profile = data.get("profile") as File

        if (!profile) {
            return NextResponse.json({ error: 'No file upload' })
        }
        console.log(profile)
        const bytes = await profile.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // unique filename
        const filename = Date.now() + '-' + profile.name
        const filepath = path.join(process.cwd(), 'public/uploads', filename)
        fs.writeFileSync(filepath, buffer)

        const imageurl = `/uploads/${filename}`
        const isExist = await UserModel.find({ email: email })
        console.log(isExist)
        if (isExist.length > 0) {
            return NextResponse.json({
                success: false,
                code: 200,
                message: "user already registered",
                error: true
            })
        }
        const result = await UserModel.create({ name, age, email, password, profile: imageurl })
        if (result) {
            return NextResponse.json({
                success: true,
                code: 201,
                message: "user registered successfully",
                id: result.id,
                error: false
            })
        }
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            code: 500,
            message: "internal server error",
            error: error
        })
    }
}

export const GET = async (request: Request) => {
    await dbconnect()
    const cookieStore = cookies()
    const id = (await cookieStore).get("ID")?.value
    const result = await UserModel.findById(id)
    return NextResponse.json({
        success: true,
        code: 200,
        message: "fetch successfully",
        dashboard: result,
        error: false
    })
}

