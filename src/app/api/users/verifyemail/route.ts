import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;

        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        
        // If no user find with given token or token is expired
        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        user.isVerified = true;
        user.verifyToken = undefined; // Clear the token
        user.verifyTokenExpiry = undefined; // Clear the expiry
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
             success: true
        }, { status: 200 });
    } catch (error: object | unknown) {
        return NextResponse.json({ error: (error as any)?.message },
        { status: 500 });
    }
}