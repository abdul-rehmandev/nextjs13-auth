import { connectDB } from "@/db/db.js";
import { verifyToken } from "@/helpers/verifyToken";
import { NextResponse } from "next/server";

connectDB()

export async function GET(req, res) {
    try {
        const userID = await verifyToken(req)

        if (!userID) return NextResponse.json({ message: "Token Invalid" }, { status: 400 })

        return NextResponse.json({ message: "User found", result: userID }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}