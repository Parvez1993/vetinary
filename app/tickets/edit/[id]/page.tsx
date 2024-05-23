"use client";

import options from "@/app/api/auth/[...nextauth]/options";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { Loader2 } from "lucide-react";
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
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTicketDetails = async () => {
      try {
        const { data } = await axios.get(`/api/tickets/${parseInt(params.id)}`);

        if (data) {
          setTicket(data);
        }
      } catch (error) {
        console.error("Failed to fetch ticket details", error);
      } finally {
        setLoading(false);
      }
    };

    getTicketDetails();
  }, [params.id]);

  return (
    <div>
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </div>
      ) : (
        ticket && <TicketForm ticket={ticket} />
      )}
    </div>
  );
}

export default EditTicket;
