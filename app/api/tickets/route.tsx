import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { TicketSchema } from "@/ValidationSchema/ticket";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";
import { getToken } from "next-auth/jwt";

export async function POST(request: NextRequest) {
  let body = await request.json();
  const validation = TicketSchema.safeParse(body);
  const session = await getServerSession(options);

  const newAppointment = new Date(body?.appointment);

  body = { ...body, appointment: newAppointment };

  if (!session) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newTicket = await prisma.ticket.create({
    data: { ...body },
  });

  return NextResponse.json(newTicket, { status: 201 });
}
