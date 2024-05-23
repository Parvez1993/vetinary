import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { TicketPatchSchema, TicketSchema } from "@/ValidationSchema/ticket";
import { getToken } from "next-auth/jwt";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const validation = TicketPatchSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const existingTicket = await prisma.ticket.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!existingTicket) {
      return NextResponse.json("Ticket not found.", { status: 404 });
    }

    if (body?.assignedToUserId) {
      body.assignedToUserId = parseInt(body.assignedToUserId);
    }

    const updatedTicket = await prisma.ticket.update({
      where: { id: parseInt(params.id) },
      data: { ...body },
    });

    return NextResponse.json(updatedTicket, { status: 200 });
  } catch (error) {
    console.error("Error occurred while updating ticket:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const ticketId = parseInt(params.id);

    if (isNaN(ticketId)) {
      return NextResponse.json("Invalid ticket ID.", { status: 400 });
    }

    const existingTicket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!existingTicket) {
      return NextResponse.json("Ticket not found.", { status: 404 });
    }

    return NextResponse.json(existingTicket, { status: 200 });
  } catch (error) {
    console.error("Error occurred while fetching ticket:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const ticketId = parseInt(params.id);

    if (isNaN(ticketId)) {
      return NextResponse.json("Invalid ticket ID.", { status: 400 });
    }

    const existingTicket = await prisma.ticket.findUnique({
      where: { id: ticketId },
    });

    if (!existingTicket) {
      return NextResponse.json("Ticket not found.", { status: 404 });
    }

    // Delete the ticket from the database
    await prisma.ticket.delete({
      where: { id: ticketId },
    });

    return NextResponse.json("Ticket deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Error occurred while deleting ticket:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
}
