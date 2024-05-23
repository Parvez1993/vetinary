"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { Toaster } from "./sonner";
import { toast } from "sonner";

interface Props {
  ticket?: Ticket;
}
function UpdateStatus({ ticket }: Props) {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <Toaster />
      <Select
        defaultValue={ticket?.status}
        onValueChange={async (value) => {
          setError("");
          setIsAssigning(true);
          await axios.patch(`/api/tickets/${ticket.id}`, {
            status: value,
          });
          setIsAssigning(false);
          toast.success("Status Changed Successfully.");
        }}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="STARTED">Started</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default UpdateStatus;
