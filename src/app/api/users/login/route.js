import { connectDB } from "@/db/db.js";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB()

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const isExist = await User.findOne({ email });

        if (!isExist) return NextResponse.json({ message: "User Not Found" }, { status: 400 })

        const isCorrectPass = await bcryptjs.compare(password, isExist.password);

        if (!isCorrectPass) return NextResponse.json({ message: "Email Or Password Invalid" }, { status: 400 })

        //create token data
        const tokenData = {
            id: isExist._id,
            isAdmin: isExist.isAdmin,
            isVerified: isExist.isVerified
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" })

        const response = NextResponse.json({ message: "Authenticated", result: isExist }, { status: 200 });

        response.cookies.set("accessToken", token, {
            httpOnly: true
        })

        return response;

    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}