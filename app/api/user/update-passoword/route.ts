import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";

const updatePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current Passoword is Required"),
    newPassword: z.string().min(3, "At least 3 length is required")
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user.email) {
            return NextResponse.json({
                message: "Unauthorised"
            }, { status: 401 });
        }
        const body = await request.json();
        const validation = updatePasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: "Invalid input.", errors: validation.error.flatten().fieldErrors }, { status: 400 }
            )
        }
        const { currentPassword, newPassword } = validation.data;
        const userEmail = session.user.email;

        const user = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (!user || !user.password) {
            return NextResponse.json({ message: "User not found." }, { status: 404 });
        }

        const isCurrentPasswordValid = await bcrypt.compare(user.password, currentPassword);
        if (!isCurrentPasswordValid) {
            return NextResponse.json(
                { message: "Incorrect current password." },
                { status: 403 }
            );
        }
        const hashedpassword = await bcrypt.hash(newPassword, 5);

        await prisma.user.update({
            where: { email: userEmail },
            data: { password: hashedpassword }
        });
        return NextResponse.json({
            message: "Password Updated succesfully"
        }, { status: 200 })
    }
    catch (e) {
        console.log("Updating Password Error", e);
        return NextResponse.json({
            message: " An internal Error Occured",
            status: 500
        });
    }
}