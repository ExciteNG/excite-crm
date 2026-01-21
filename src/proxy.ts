import { type NextRequest, NextResponse } from "next/server";

export const proxy = (req: NextRequest) => {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (!token && pathname.startsWith("/dashboard"))
    return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
};

export const config = {
  matcher: ["/dashboard/:path*"],
};
