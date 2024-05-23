import Link from "next/link";
import React from "react";
import ToggleMode from "./ToggleMode";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

async function MainNav() {
  const session = await getServerSession(options);

  const role = session?.user?.role;
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        {role === "ADMIN" && (
          <>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
            <Link href="/users">Users</Link>
          </>
        )}
        {role === "VETINARY" && (
          <>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
          </>
        )}
        {role === "ASSISTANT" && (
          <>
            <Link href="/tickets">Tickets</Link>
          </>
        )}
        {!role && (
          <>
            <Link href="/">Dashboard</Link>
            <Link href="/tickets">Tickets</Link>
          </>
        )}
      </div>
      <div>Vetinary Zone</div>
      <div className="flex items-center gap-2">
        {session ? (
          <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
        ) : (
          <Link href="/api/auth/signin">Login</Link>
        )}
        <Link href="/tickets">
          <ToggleMode />
        </Link>
      </div>
    </div>
  );
}

export default MainNav;
