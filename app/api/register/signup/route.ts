import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { prisma } from "@/utils/prisma";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        const existingUser = await prisma.user.findUnique({
            where: { email: email }
        });
        if (existingUser) {
            return new NextResponse("User Already exists with this email", { status: 409 });
        }

        const hashedpassword = await bcrypt.hash(password, 5);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedpassword
            }
        });
        return NextResponse.json({
            message: "User Created",
            newUser,
            status: 201
        });

    }
    catch (e) {
        console.log("Error in Signing Up", e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
