"use client";
import StatusFilter from "@/components/StatusFilter";
import TicketPriority from "@/components/TicketPriority";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import DateFilter from "../../components/DateFilter";

interface Props {
  tickets: Ticket[];
  session: {
    user: {
      role: string;
    };
  };
}

function DataTable({ tickets, session }: Props) {
  const router = useRouter();

  const deleteFunction = async (id: string) => {
    try {
      const response = await axios.delete(`/api/tickets/${id}`);
      if (response.status === 200) {
        toast.success("Ticket has been deleted.");
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to delete the ticket.");
    }
  };

  return (
    <div className="overflow-x-auto md:overflow-x-hidden my-5">
      <Toaster />
      <div className="flex gap-1 flex-col md:flex-row my-4">
        <StatusFilter />
        <div className="ml-2">
          <DateFilter />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Appointment</TableHead>
            <TableHead>Animal</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created At</TableHead>
            {session?.user?.role === "ADMIN" && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell>
                <Link href={`/tickets/${ticket.id}`}>{ticket.title}</Link>
              </TableCell>
              <TableCell>
                <TicketStatusBadge status={ticket.status} />
              </TableCell>
              <TableCell>
                {moment(ticket?.appointment).format("DD/MM/YYYY hh:mm A")}
              </TableCell>
              <TableCell>
                <div className="ml-1">{ticket?.animal}</div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <TicketPriority priority={ticket.priority} />
                </div>
              </TableCell>
              <TableCell>
                {moment(ticket.createdAt).format("DD/MM/YYYY hh:mm A")}
              </TableCell>
              {session?.user?.role === "ADMIN" && (
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Link href={`/tickets/edit/${ticket.id}`}>
                      <Pencil className="hover:cursor-pointer hover:text-green-600" />
                    </Link>
                    <Button
                      className="border-none"
                      variant="outline"
                      size="icon"
                      onClick={() => deleteFunction(ticket.id)}
                    >
                      <Trash className="hover:cursor-pointer hover:text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
