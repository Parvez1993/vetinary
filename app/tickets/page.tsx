import prisma from "@/prisma/db";
import React from "react";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import CustomPagination from "@/components/CustomPagination";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

export interface SearchParams {
  page: string;
  status: string;
  date: string;
}

const PAGE_SIZE = 10;

const buildWhereClause = (status: string, date: string, session) => {
  let where: any = {};

  if (status) {
    where.status = status;
  } else {
    where.NOT = [{ status: "CLOSED" }];
  }

  if (date) {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    where.appointment = {
      gte: startDate,
      lt: endDate,
    };
  }

  if (session?.user?.role !== "ADMIN") {
    where.assignedToUserId = Number(session?.user?.id);
  }

  return where;
};

const fetchTicketsData = async (where: any, page: number) => {
  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    take: PAGE_SIZE,
    skip: (page - 1) * PAGE_SIZE,
    where,
  });

  return { ticketCount, tickets };
};

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession(options);

  const page = parseInt(searchParams.page) || 1;
  const where = buildWhereClause(
    searchParams.status,
    searchParams.date,
    session
  );
  const { ticketCount, tickets } = await fetchTicketsData(where, page);

  return (
    <div>
      <Header session={session} />
      <DataTable tickets={tickets} session={session} />
      <CustomPagination
        itemCount={ticketCount}
        pageSize={PAGE_SIZE}
        currentPage={page}
      />
    </div>
  );
};

const Header = ({ session }: { session: any }) => (
  <div className="flex justify-between items-center">
    {isAuthorized(session) && (
      <Link
        href="/tickets/new"
        className={buttonVariants({
          variant: "default",
          className: "m-2",
        })}
      >
        Create Tickets
      </Link>
    )}
    {isAuthorized(session) && (
      <Link
        href="/tickets"
        className={buttonVariants({
          variant: "default",
          className: "m-2 bg-purple-800 hover:bg-purple-500",
        })}
      >
        Clear
      </Link>
    )}
  </div>
);

const isAuthorized = (session: any) => {
  return (
    session?.user.role === "ADMIN" || session?.user.role === "RECEPTIONIST"
  );
};

export default Tickets;
