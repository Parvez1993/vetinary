import DashChart from "@/components/DashChart";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import prisma from "@/prisma/db";
import Link from "next/link";
import React from "react";

const Dashboard = async () => {
  const tickets = await prisma.ticket.findMany({
    where: {
      NOT: [{ status: "CLOSED" }],
    },
    orderBy: {
      updatedAt: "desc",
    },
    skip: 0,
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  const groupTicket = await prisma.ticket.groupBy({
    by: ["status"],
    _count: {
      id: true,
    },
  });

  const data = groupTicket.map((item) => {
    return {
      name: item.status,
      total: item._count.id,
    };
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 px-2">
      <div>
        <Card className="col-span-1 h-[480px]">
          <CardHeader>
            <CardTitle>Recently Updated</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {tickets
                ? tickets.map((ticket) => (
                    <div className="flex items-center" key={ticket.id}>
                      <TicketStatusBadge status={ticket.status} />
                      <div className="ml-4 space-y-1">
                        <Link href={`tickets/${ticket.id}`}>
                          <p>{ticket.title}</p>
                          <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                        </Link>
                      </div>
                      <div className="ml-auto font-medium"></div>
                    </div>
                  ))
                : null}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <DashChart data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
