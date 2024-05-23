import { TicketStatus } from "@prisma/client";
import React from "react";
import { Badge } from "./ui/badge";

interface Props {
  status: TicketStatus;
}

const statusMap: Record<
  TicketStatus,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  OPEN: { label: "Open", color: "bg-red-400" },
  STARTED: { label: "Started", color: "bg-blue-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

function TicketStatusBadge({ status }: Props) {
  return (
    <Badge className={`${statusMap[status].color}`}>
      {statusMap[status].label}
    </Badge>
  );
}

export default TicketStatusBadge;
