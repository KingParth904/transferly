import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";

export async function GET(_request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({
                message: "Unauthorised"
            }, { status: 401 })
        }
        const currentUserId = session.user.id;

        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { senderId: currentUserId },
                    { receiverId: currentUserId }
                ]
            },
            include: {
                sender: {
                    select: { username: true },
                },
                receiver: {
                    select: { username: true },
                },
            },
            orderBy: {
                timestamp: "desc"
            },
        });
        const formattedTransactions = transactions.map((tx) => {
            const isSender = tx.senderId === currentUserId;
            const type = isSender ? "sent" : "received";
            const peer = isSender ? tx.receiver : tx.sender;

            return {
                id: tx.id,
                type: type,
                amount: tx.amount,
                status: tx.status,
                timeStamp: tx.timestamp,
                peer: {
                    name: peer.username
                }
            }

        });
        return NextResponse.json(formattedTransactions, { status: 200 });

    }
    catch (e) {
        console.log("History fetch error", e);
        return NextResponse.json({
            message: "An Internal error Occured"
        }, { status: 500 });
    }
}