import { SignJWT, jwtVerify } from "jose"

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error("JWT_SECRET environment variable is not set")
const secret = new TextEncoder().encode(jwtSecret)

export type JwtPayload = {
  userId: number
  username: string
  email: string
  role: string
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("6h")
    .sign(secret)
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as JwtPayload
  } catch {
    return null
  }
}
