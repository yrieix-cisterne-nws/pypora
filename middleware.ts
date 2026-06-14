import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/lib/jwt"

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value
  const path = req.nextUrl.pathname

  const payload = token ? await verifyToken(token) : null

  if (!payload) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (path.startsWith("/admin") && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
}