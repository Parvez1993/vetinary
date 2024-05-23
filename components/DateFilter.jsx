import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // Get current search parameters
    const currentParams = new URLSearchParams(searchParams.toString());

    // Format the date to ISO 8601 format
    const formattedDate = date.toISOString();

    // Update or add the date parameter
    currentParams.set("date", formattedDate);

    // Update the URL with the new search parameters
    router.push(`tickets?${currentParams.toString()}`);
  };

  return (
    <ReactDatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Select Date"
      dateFormat="Pp"
      className="px-4 py-2 border rounded-md shadow-sm w-[300px] h-10"
      calendarClassName="rounded-md shadow-lg bg-white border"
    />
  );
}

export default DateFilter;
