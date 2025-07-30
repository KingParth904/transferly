

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/prisma";

const transferSchema = z.object({
    toUserId: z.string().cuid("Invalid user ID format."),
    amount: z.number().positive({ message: "Amount must be a positive number." }),
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validation = transferSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { message: "Invalid input.", errors: validation.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        const { toUserId, amount } = validation.data;
        const senderEmail = session.user.email;
        const amountToTransfer = parseFloat(amount.toFixed(2));

        const transactionResult = await prisma.$transaction(async (tx) => {
            const sender = await tx.user.findUnique({ where: { email: senderEmail } });
            if (!sender) throw new Error("Sender not found.");
            if (sender.balance < amountToTransfer) throw new Error("Insufficient funds.");

            await tx.user.update({ where: { email: senderEmail }, data: { balance: { decrement: amountToTransfer } } });
            await tx.user.update({ where: { id: toUserId }, data: { balance: { increment: amountToTransfer } } });

            const transaction = await tx.transaction.create({
                data: {
                    amount: amountToTransfer,
                    senderId: sender.id,
                    receiverId: toUserId,
                    status: 'COMPLETED',
                },
            });
            return transaction;
        });


        return NextResponse.json({
            message: "Transfer successful!",
            transactionId: transactionResult.id,
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("TRANSFER ERROR:", error);
        if (error instanceof Error) {
            if (error.message === "Insufficient funds.") {
                return NextResponse.json({ message: error.message }, { status: 400 });
            }
        }
        return NextResponse.json(
            { message: "An internal server error occurred during the transfer." },
            { status: 500 }
        );
    }
}
