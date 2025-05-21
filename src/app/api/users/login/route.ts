import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 });
        }

        // Create token data
        const tokenData = {
            id: user._id,
            email: user.email, 
            username: user.username
        }

        // Create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d"})
        
        // Set token in cookies
        const res = NextResponse.json(
            { message: "Login successful" },
            { status: 200 }
        );

        res.cookies.set( "token", token,
            {httpOnly: true},
        )

        return res;
    } catch(error: any) {
        console.log("Error in login", error);
        return NextResponse.json({ error: error.messsage }, { status: 500 });
    }
}