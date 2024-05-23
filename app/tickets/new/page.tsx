import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

function NewTicket() {
  return <TicketForm />;
}

export default NewTicket;
