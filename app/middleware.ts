import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { account } from "@/app/appwrite";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const publicPaths = ["/sign-in", "/sign-up"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  try {
    const session = await account.get();
    if (session) {
      return NextResponse.next();
    }
  } catch (error) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
