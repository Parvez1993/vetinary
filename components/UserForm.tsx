"use client";

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
import { Ticket, User } from "@prisma/client";
import { use, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserSchema } from "@/ValidationSchema/user";

type UserFornData = z.infer<typeof UserSchema>;

interface Props {
  user?: User;
}

function UserForn({ user }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm<UserFornData>({
    resolver: zodResolver(UserSchema),
  });

  async function onSubmit(values: z.infer<typeof UserSchema>) {
    try {
      setIsSubmitting(true);
      setError("");

      if (user) {
        await axios.patch("/api/users/" + user.id, values);
      } else {
        await axios.post("/api/users", values);
      }
      setIsSubmitting(false);
      router.push("/users");
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
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="User Fullname" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue={user?.password}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    required={user ? false : true}
                    type="password"
                    placeholder="User Password"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            defaultValue={user?.role}
            render={({ field }) => (
              <FormItem className="w-[200px]">
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Role Value"
                        defaultValue={"USER"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                    <SelectItem value="VETINARY">VETINARY</SelectItem>
                    <SelectItem value="ASSISTANT">ASSISTANT</SelectItem>
                    <SelectItem value="USER">USER</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="my-5">
            {user ? "Update User" : "Create User"}
          </Button>
        </form>
        <p className="text-destructive">{error}</p>
      </Form>
    </div>
  );
}

export default UserForn;
