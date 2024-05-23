import { User } from "@prisma/client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import Link from "next/link";
import { Pencil } from "lucide-react";

interface Props {
  user: User[];
}
async function UserTable({ user }: Props) {
  const userData = await prisma.user.findMany();
  return (
    <div className="overflow-x-auto md:overflow-x-hidden my-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Role</TableHead>
            {user?.role == "ADMIN" && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user?.name}</TableCell>
              <TableCell>{user?.username}</TableCell>
              <TableCell>{user?.role}</TableCell>
              {user?.role == "ADMIN" && (
                <TableCell>
                  <div className="flex gap-2 items-center">
                    <Link href={`/users/${user?.id}`}>
                      {" "}
                      <Pencil className="hover:cursor-pointer hover:text-green-600" />
                    </Link>
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default UserTable;
