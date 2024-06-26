import { PRIORITY } from "@prisma/client";
import { Cat } from "lucide-react";
import React from "react";

interface Props {
  priority?: PRIORITY;
}

// Define the mapping between TicketStatus and badge properties
const priorityMap: Record<PRIORITY, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: "High", level: 3 },
  LOW: { label: "Low", level: 1 },
  MEDIUM: { label: "Medium", level: 2 },
};

function TicketPriority({ priority }: Props) {
  // Provide a default priority if none is provided
  const effectivePriority = priority || "LOW";
  return (
    <>
      <Cat
        className={`${
          priorityMap[effectivePriority].level >= 1
            ? "text-primary"
            : "text-muted"
        }`}
      />
      <Cat
        className={`${
          priorityMap[effectivePriority].level >= 2
            ? "text-primary"
            : "text-muted"
        }`}
      />
      <Cat
        className={`${
          priorityMap[effectivePriority].level >= 3
            ? "text-primary"
            : "text-muted"
        }`}
      />
    </>
  );
}

export default TicketPriority;
