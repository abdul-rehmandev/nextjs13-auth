import { connectDB } from "@/db/db.js";
import User from "@/models/userModel.js";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

connectDB()

export async function POST(req) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;

        const isExist = await User.findOne({ email })
        if (isExist) return NextResponse.json({ message: "User Already Exist" }, { status: 400 })

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const createdUser = new User({ username, email, password: hashedPassword })

        await createdUser.save();

        return NextResponse.json({ message: "User created successfully", result: createdUser }, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
