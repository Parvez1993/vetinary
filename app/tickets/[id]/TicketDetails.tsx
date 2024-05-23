import options from "@/app/api/auth/[...nextauth]/options";
import AssignTicket from "@/components/AssignTickets";
import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import UpdateStatus from "@/components/ui/UpdateStatus";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Ticket, User } from "@prisma/client";
import axios from "axios";
import moment from "moment";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import ReactMarkDown from "react-markdown";

interface Props {
  ticket?: Ticket;
  users: User[];
  role?: string;
}

async function TicketDetails({ ticket, users, role }: Props) {
  const session = await getServerSession(options);

  return (
    <Card className="mx-6 lg:mx-0">
      <CardHeader>
        <div className="flex justify-between items-center">
          {ticket && <TicketStatusBadge status={ticket.status} />}
          <div className="flex gap-1">
            {ticket && <TicketPriority priority={ticket.priority} />}
          </div>
        </div>
        <CardTitle className="text-2xl py-5">{ticket?.title}</CardTitle>
        <CardDescription>
          Created:{" "}
          {ticket && moment(ticket.createdAt).format("DD/MM/YYYY hh:mm A")}
        </CardDescription>
      </CardHeader>
      <CardContent className="prose">
        <ReactMarkDown>{ticket?.description}</ReactMarkDown>
      </CardContent>
      {ticket?.updatedAt && (
        <CardFooter className="text-sm text-muted-foreground">
          Updated: {moment(ticket.updatedAt).format("DD/MM/YYYY hh:mm A")}
        </CardFooter>
      )}
      <div className="flex flex-wrap gap-4 mx-5 my-5 items-center justify-between w-4/5">
        {isAuthorizedToUpdate(session) && (
          <Link
            href={`/tickets/edit/${ticket?.id}`}
            className={buttonVariants({
              variant: "default",
            })}
          >
            Update Tickets
          </Link>
        )}
        {isAuthorizedToStatus(session) && (
          <div className="my-3">
            <Label>Status Change</Label>
            <UpdateStatus ticket={ticket} />
          </div>
        )}
        {isAuthorizedToAssign(session) && (
          <div className="flex flex-wrap flex-col gap-2 w-1/5">
            {ticket && users && (
              <div className=" ">
                <Label>Assign to User</Label>
                <AssignTicket ticket={ticket} users={users} />
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

const isAuthorizedToUpdate = (session: any) => {
  return session?.user.role === "ADMIN" || session?.user.role === "VETINARY";
};

const isAuthorizedToStatus = (session: any) => {
  return (
    session?.user.role === "ADMIN" ||
    session?.user.role === "VETINARY" ||
    session?.user.role === "ASSISTANT"
  );
};

const isAuthorizedToAssign = (session: any) => {
  return session?.user.role === "ADMIN";
};

export default TicketDetails;
