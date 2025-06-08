import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const reqBody = await request.json();
        const {username, email, password} = reqBody;

        // Check if user already exists
        const user = await User.findOne({email})
        if (user) {
            return NextResponse.json({error: "User already exists"},
                {status: 400});
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        // Send verification email
        await sendEmail({email: savedUser.email, emailType: "VERIFY", userID: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: savedUser
        });

    } catch (error:  object | unknown) {
        return NextResponse.json({error: (error as any)?.message},
            {status: 500});
    }
}