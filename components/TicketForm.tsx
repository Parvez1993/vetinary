"use client";

import { TicketSchema } from "@/ValidationSchema/ticket";

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import SimpleMdeReact from "react-simplemde-editor";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import { Button } from "./ui/button";
import { Ticket } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type TicketFormData = z.infer<typeof TicketSchema>;

interface Props {
  ticket?: Ticket;
}

function TicketForm({ ticket }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const form = useForm<TicketFormData>({
    resolver: zodResolver(TicketSchema),
  });

  async function onSubmit(values: z.infer<typeof TicketSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      // Perform validation
      if (!values.description.trim()) {
        setDescriptionError("Description is required.");
        return;
      }

      if (ticket) {
        await axios.patch("/api/tickets/" + ticket.id, values);
      } else {
        await axios.post("/api/tickets", values);
      }
      setIsSubmitting(false);
      router.push("/tickets");
      router.refresh();
    } catch (error) {
      console.log(error);
      setError("Unknown Error Occured.");
      setIsSubmitting(false);
    }
  }
  return (
    <div className="rounded-md border w-full p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            defaultValue={ticket?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ticket Ttitle" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="my-5">
            <FormLabel>Description</FormLabel>
            <Controller
              name="description"
              defaultValue={ticket?.description}
              control={form.control}
              render={({ field }) => (
                <SimpleMdeReact placeholder="Description" {...field} />
              )}
            />
            <p className="text-red-500">{descriptionError}</p>
          </div>

          <div className="my-5">
            <FormField
              control={form.control}
              name="price"
              defaultValue={ticket?.price}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Price"
                      {...field}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 md:flex-row">
            <FormField
              control={form.control}
              name="status"
              defaultValue={ticket?.status}
              render={({ field }) => (
                <FormItem className="w-[200px]">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Status Value"
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="STARTED">Started</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                      <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="priority"
              defaultValue={ticket?.priority}
              render={({ field }) => (
                <FormItem className="w-[200px]">
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field?.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="LOW">LOW</SelectItem>
                      <SelectItem value="MEDIUM">MEDIUM</SelectItem>
                      <SelectItem value="HIGH">HIGH</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="animal"
              defaultValue={ticket?.animal}
              render={({ field }) => (
                <FormItem className="w-[200px]">
                  <FormLabel>Animal</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Animal Type"
                          defaultValue={ticket?.status}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="CAT">CAT</SelectItem>
                      <SelectItem value="DOG">DOG</SelectItem>
                      <SelectItem value="BIRD">BIRD</SelectItem>
                      <SelectItem value="GOAT">GOAT</SelectItem>
                      <SelectItem value="OTHERS">OTHERS</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointment"
              render={({ field }) => (
                <FormItem className="w-[200px]">
                  <FormLabel>Appointment Date and Time</FormLabel>
                  <Controller
                    control={form.control}
                    name="appointment"
                    render={({ field }) => (
                      <ReactDatePicker
                        selected={field.value}
                        onChange={field.onChange}
                        showTimeSelect
                        dateFormat="Pp"
                        className="px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-500 w-[200px]"
                        calendarClassName="rounded-md shadow-lg bg-white border"
                      />
                    )}
                  />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="my-5">
            {ticket ? "Update Ticket" : "Create Ticket"}
          </Button>
        </form>
        <p className="text-destructive">{error}</p>
      </Form>
    </div>
  );
}

export default TicketForm;
