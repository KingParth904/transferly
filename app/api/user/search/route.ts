import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({
                message: "unauthroised",
                status: 401
            })
        }
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query");

        if (!query) {
            return NextResponse.json({
                message: 'Seach Query is Required',
                status: 400
            });
        }
        const users = await prisma.user.findMany({
            where: {
                NOT: {
                    email: session.user.email
                },
                OR: [
                    {
                        username: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }, {
                        email: {
                            contains: query,
                            mode: "insensitive"
                        }
                    }
                ],
            },
            select: {
                id: true,
                username: true,
                email: true
            },
            take: 10
        })

        return NextResponse.json(users, {
            status: 200
        });
    }
    catch (e) {
        console.log("ERROR in /api/user/seach:", e);
        return NextResponse.json({ message: "An internal server error occured " }, {
            status: 500
        });
    }
}
