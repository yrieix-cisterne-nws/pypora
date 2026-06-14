import { cookies } from "next/headers"
import { verifyToken, type JwtPayload } from "@/lib/jwt"

export async function getPayload(): Promise<JwtPayload | null> {
  const token = (await cookies()).get("token")?.value
  return token ? await verifyToken(token) : null
}
