"use client";

import options from "@/app/api/auth/[...nextauth]/options";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Props {
  params: { id: string };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

function EditTicket({ params }: Props) {
  const [tickets, setTickets] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTicketDetails = async () => {
      const { data } = await axios.get(`/api/tickets/${parseInt(params.id)}`);

      if (data) {
        setLoading(false);
        setTickets(data);
      }
    };
    getTicketDetails();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex w-full item-center justify-center ">
          <div>
            <Loader2 className="mr-2 h-4 w-4 animate-spin " />
          </div>
        </div>
      ) : (
        <TicketForm ticket={tickets} />
      )}
    </div>
  );
}

export default EditTicket;
