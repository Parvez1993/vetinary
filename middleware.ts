import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  console.log("Token:", token);

  // Redirect to login if no token is found
  if (!token)
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));

  // Check the role and redirect based on the role
  const { role } = token;

  switch (role) {
    case "ADMIN":
      // Admins have access to all routes, so no need to redirect
      return NextResponse.next();
    case "VETINARY":
      if (
        !request.nextUrl.pathname.startsWith("/tickets") &&
        !request.nextUrl.pathname.startsWith("/")
      ) {
        return NextResponse.redirect(new URL("/tickets", request.url));
      }
      break;
    case "ASSISTANT":
      if (!request.nextUrl.pathname.startsWith("/tickets")) {
        return NextResponse.redirect(new URL("/tickets", request.url));
      }
      break;
    case "USER":
      if (
        !request.nextUrl.pathname.startsWith("/tickets/new") &&
        !request.nextUrl.pathname.startsWith("/tickets") &&
        !request.nextUrl.pathname.startsWith("/")
      ) {
        return NextResponse.redirect(new URL("/tickets", request.url));
      }
      break;
    default:
      return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except the ones that start with /login, /api, and the static folder
    "/((?!api|_next/static|_next/image|favicon.ico|login).*)",
  ],
};
