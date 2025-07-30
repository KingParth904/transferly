import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";

export async function GET(_request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json(
                { message: "Unauthoried : PLease Log in" },
                { status: 401 }
            );
        }
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            select: {
                id: true,
                username: true,
                email: true,
                balance: true
            }

        });
        return NextResponse.json(user, { status: 200 });
    }
    catch (error) {
        console.error("ERROR in /api/user/me:", error);
        // Return a generic error response
        return NextResponse.json(
            { message: "An internal server error occurred." },
            { status: 500 }
        );
    }
}