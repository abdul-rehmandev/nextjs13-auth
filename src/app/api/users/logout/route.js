import { connectDB } from "@/db/db.js";
import { NextResponse } from "next/server";

connectDB()

export async function GET() {
    try {
        console.log("called")
        const response = NextResponse.json({ message: "Logged Out Success" }, { status: 200 })

        response.cookies.set("accessToken", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
