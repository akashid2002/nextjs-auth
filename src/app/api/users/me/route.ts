import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const userID = await getDataFromToken(request);
        const user = await User.findById({ _id: userID }).select("-password");
        return NextResponse.json(
            { user, message: "User fetched successfully", success: true },
            { status: 200 }
        );
    } catch (error: object | unknown) {
        return NextResponse.json({ error: (error as any)?.message }, { status: 500 });
    }
}
