import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function StatusFilter() {
  const statuses: { label: string; value?: string }[] = [
    { label: "Open / Started", value: "none" },
    { label: "Open", value: "OPEN" },
    { label: "Started", value: "STARTED" },
    { label: "Closed", value: "CLOSED" },
    { label: "CANCELLED", value: "CANCELLED" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className=" m-2 md:m-0">
      <Select
        defaultValue={searchParams.get("status") || ""}
        onValueChange={(status) => {
          if (status === "none") {
            return;
          } else {
            const params = new URLSearchParams();

            if (status) params.append("status", status);

            const query = params.size ? `?${params.toString()}` : "";
            router.push(`/tickets${query}`);
          }
        }}
      >
        <SelectTrigger className=" w-[300px] h-10" my-2>
          <SelectValue placeholder="Filter by Status..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses.map((status) => (
              <SelectItem key={status.value || "0"} value={status.value || "0"}>
                {status.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default StatusFilter;
