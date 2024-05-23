import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { Ticket } from "@prisma/client";
import TicketDetails from "./TicketDetails";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export default async function TicketDetailsLayout({ params }: Props) {
  const session = await getServerSession(options);
  const response = await fetch(
    `${process.env.URL}/api/tickets/${parseInt(params.id)}`,
    { next: { revalidate: 0 } }
  );

  console.log("responseresponse", response);

  let data = await response?.json();

  const users = await prisma.user.findMany();

  return (
    <div>
      <TicketDetails ticket={data} users={users} role={session?.user?.role} />
    </div>
  );
}
