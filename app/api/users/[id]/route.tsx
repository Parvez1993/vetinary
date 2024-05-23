import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";
import { UserSchema } from "@/ValidationSchema/user";
import { getServerSession } from "next-auth";

import bcrypt from "bcryptjs";
import options from "../../auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  try {
    const body = await request.json();
    const validation = UserSchema.safeParse(body);
    const session = await getServerSession(options);

    if (!validation.success) {
      return NextResponse.json(validation.error.format(), { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User Not Found" }, { status: 404 });
    }

    if (body?.password && body.password != "") {
      const hashPassword = await bcrypt.hash(body.password, 10);
      body.password = hashPassword;
    } else {
      delete body.password;
    }

    if (user.username !== body.username) {
      const duplicateUsername = await prisma.user.findUnique({
        where: { username: body.username },
      });
      if (duplicateUsername) {
        return NextResponse.json(
          { message: "Duplicate Username" },
          { status: 409 }
        );
      }
    }

    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...body,
      },
    });

    return NextResponse.json(updateUser);
  } catch (error) {
    console.error("Error occurred while updating ticket:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const userId = parseInt(params.id);

    if (isNaN(userId)) {
      return NextResponse.json("Invalid User.", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json("User not found.", { status: 404 });
    }

    return NextResponse.json(existingUser, { status: 200 });
  } catch (error) {
    console.error("Error occurred while fetching ticket:", error);
    return NextResponse.json("Internal server error.", { status: 500 });
  }
}
