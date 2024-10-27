import {  NextRequest } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: NextRequest, { params }: { params: IParams }) {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { reservationId } = params;

    if (!reservationId || typeof reservationId !== "string") {
        return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
        },
    });

    return Response.json(reservation);
    
}

//ai edit nextresponse to response